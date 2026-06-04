export const TRIP_THEMES = [
  'beach',
  'city_break',
  'business',
  'adventure',
  'road_trip',
  'romantic',
  'family',
  'festival',
  'ski',
  'backpacking',
] as const

export type TripTheme = (typeof TRIP_THEMES)[number]

export interface Trip {
  id: string
  user_id: string
  title: string
  destination: string | null
  theme: TripTheme
  start_date: string | null
  end_date: string | null
  cover_img: string | null
  created_at: string
}

export type TripInsert = {
  title: string
  destination?: string | null
  theme?: TripTheme
  start_date?: string | null
  end_date?: string | null
  cover_img?: string | null
}
