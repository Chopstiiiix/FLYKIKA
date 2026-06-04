/**
 * Plan model.
 *
 * Every plan type is a row in `plans` sharing one shape (time, location,
 * confirmation, status). Type-specific fields live in the `details` JSONB
 * column, modelled here as a discriminated union on `type`.
 */

export const PLAN_TYPES = [
  'flight',
  'lodging',
  'car',
  'dining',
  'meeting',
  'cruise',
  'ferry',
  'activity',
  'parking',
  'train',
] as const

export type PlanType = (typeof PLAN_TYPES)[number]

export const PLAN_STATUSES = [
  'planned',
  'booked',
  'confirmed',
  'cancelled',
] as const
export type PlanStatus = (typeof PLAN_STATUSES)[number]

export const PLAN_SOURCES = ['manual', 'email_parsed', 'api_booked'] as const
export type PlanSource = (typeof PLAN_SOURCES)[number]

/* ---- Per-type `details` shapes ------------------------------------------ */

export interface FlightDetails {
  flightNumber?: string
  airline?: string
  depAirport?: string
  arrAirport?: string
  gate?: string
  seat?: string
  pnr?: string
}

export interface LodgingDetails {
  propertyName?: string
  roomType?: string
  checkIn?: string
  checkOut?: string
  address?: string
}

export interface CarDetails {
  vendor?: string
  vehicleClass?: string
  pickupAddress?: string
  dropoffAddress?: string
}

export interface DiningDetails {
  restaurant?: string
  partySize?: number
  cuisine?: string
}

export interface MeetingDetails {
  attendees?: string[]
  agenda?: string
  videoLink?: string
}

/** Shared by `cruise` and `ferry`. */
export interface CruiseFerryDetails {
  operator?: string
  vessel?: string
  departurePort?: string
  arrivalPort?: string
  cabin?: string
}

export interface ActivityDetails {
  provider?: string
  voucherCode?: string
  meetingPoint?: string
}

export interface ParkingDetails {
  facility?: string
  spot?: string
  plate?: string
}

export interface TrainDetails {
  operator?: string
  coach?: string
  seat?: string
  depStation?: string
  arrStation?: string
}

/** Maps each `plan_type` to its `details` payload. */
export interface PlanDetailsMap {
  flight: FlightDetails
  lodging: LodgingDetails
  car: CarDetails
  dining: DiningDetails
  meeting: MeetingDetails
  cruise: CruiseFerryDetails
  ferry: CruiseFerryDetails
  activity: ActivityDetails
  parking: ParkingDetails
  train: TrainDetails
}

/* ---- Shared row shape + discriminated union ----------------------------- */

/** Fields common to every plan, independent of `type`. */
export interface PlanBase {
  id: string
  trip_id: string
  title: string
  start_datetime: string | null
  end_datetime: string | null
  /** GeoJSON point as returned by PostGIS, or null. */
  start_location: GeoPoint | null
  end_location: GeoPoint | null
  start_address: string | null
  end_address: string | null
  confirmation_number: string | null
  status: PlanStatus
  source: PlanSource
  attachments: string[]
  created_at: string
}

/** PostGIS `geography(Point,4326)` serialised as GeoJSON. */
export interface GeoPoint {
  type: 'Point'
  /** [longitude, latitude] */
  coordinates: [number, number]
}

/**
 * A fully-typed plan: the `type` discriminant narrows `details`.
 * e.g. `if (plan.type === 'flight') plan.details.pnr`
 */
export type Plan = {
  [T in PlanType]: PlanBase & { type: T; details: PlanDetailsMap[T] }
}[PlanType]

/** Payload for inserting a plan (server fills id/created_at). */
export type PlanInsert = {
  [T in PlanType]: {
    trip_id: string
    type: T
    title: string
    start_datetime?: string | null
    end_datetime?: string | null
    start_address?: string | null
    end_address?: string | null
    confirmation_number?: string | null
    status?: PlanStatus
    source?: PlanSource
    details?: Partial<PlanDetailsMap[T]>
    attachments?: string[]
  }
}[PlanType]
