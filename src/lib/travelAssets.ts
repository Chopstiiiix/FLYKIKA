import type { Plan } from '@/types/plans'
import type { Trip } from '@/types/trips'

export const TRAVEL_IMAGES = {
  skyTower:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Sky_Tower%2C_Auckland.jpg/960px-Sky_Tower%2C_Auckland.jpg',
  bali:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Ulun_Danu_Beratan_Temple.jpg/960px-Ulun_Danu_Beratan_Temple.jpg',
  rome:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Colosseum_at_sunset-Rome.JPG/960px-Colosseum_at_sunset-Rome.JPG',
  machuPicchu:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Machu_Picchu_%28Peru%29.jpg/960px-Machu_Picchu_%28Peru%29.jpg',
}

export const DEMO_TRIPS: Trip[] = [
  {
    id: 'demo-rome',
    user_id: 'demo',
    title: 'Rome, Italy',
    destination: 'Rome, Italy',
    theme: 'romantic',
    start_date: '2025-03-10',
    end_date: '2025-03-17',
    cover_img: TRAVEL_IMAGES.rome,
    created_at: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'demo-cusco',
    user_id: 'demo',
    title: 'Cusco & Machu Picchu',
    destination: 'Cusco & Machu Picchu',
    theme: 'adventure',
    start_date: '2025-01-05',
    end_date: '2025-01-13',
    cover_img: TRAVEL_IMAGES.machuPicchu,
    created_at: '2025-01-01T00:00:00.000Z',
  },
]

export const DEMO_AUCKLAND_TRIP: Trip = {
  id: 'demo-auckland',
  user_id: 'demo',
  title: 'Auckland City Guide',
  destination: 'Auckland',
  theme: 'city_break',
  start_date: '2025-04-04',
  end_date: null,
  cover_img: TRAVEL_IMAGES.skyTower,
  created_at: '2025-01-01T00:00:00.000Z',
}

export const DEMO_PLANS: Plan[] = [
  {
    id: 'demo-sky-tower',
    trip_id: 'demo',
    type: 'activity',
    title: 'Sky Tower',
    start_datetime: '2025-04-04T15:00:00.000Z',
    end_datetime: '2025-04-04T17:00:00.000Z',
    start_location: {
      type: 'Point',
      coordinates: [174.7622, -36.8484],
    },
    end_location: null,
    start_address: 'Victoria Street West, Auckland',
    end_address: null,
    confirmation_number: null,
    status: 'planned',
    source: 'manual',
    attachments: [],
    created_at: '2025-01-01T00:00:00.000Z',
    details: {
      provider: 'SkyCity Auckland',
      meetingPoint: 'Main observation deck',
      voucherCode: 'NZS32',
    },
  },
  {
    id: 'demo-harbour',
    trip_id: 'demo',
    type: 'activity',
    title: 'Viaduct Harbour Walk',
    start_datetime: '2025-04-04T19:00:00.000Z',
    end_datetime: '2025-04-04T20:00:00.000Z',
    start_location: {
      type: 'Point',
      coordinates: [174.7633, -36.842],
    },
    end_location: null,
    start_address: 'Auckland waterfront',
    end_address: null,
    confirmation_number: null,
    status: 'planned',
    source: 'manual',
    attachments: [],
    created_at: '2025-01-01T00:00:00.000Z',
    details: {
      provider: 'FlyKika AI',
      meetingPoint: 'Harbour bridge view',
    },
  },
]

export function formatTripDate(start: string | null, end?: string | null) {
  if (!start) return 'April 4, 2025'
  const first = new Date(start)
  const startLabel = first.toLocaleDateString([], {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!end) return startLabel

  const last = new Date(end)
  return `${startLabel} - ${last.toLocaleDateString([], {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}`
}

export function formatTimeRange(start: string | null, end: string | null) {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
  }
  if (!start) return '9:00 AM - 10:00 PM'
  const startTime = new Date(start).toLocaleTimeString([], options)
  const endTime = end ? new Date(end).toLocaleTimeString([], options) : '10:00 PM'
  return `${startTime} - ${endTime}`
}
