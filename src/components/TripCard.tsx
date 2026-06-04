import { Link } from 'react-router-dom'
import { THEMES } from '@/theme/themes'
import type { Trip } from '@/types/trips'

/** Compact trip summary used in the trips list. */
export function TripCard({ trip }: { trip: Trip }) {
  const theme = THEMES[trip.theme]
  return (
    <Link
      to={`/trips/${trip.id}`}
      className="block overflow-hidden rounded-2xl shadow-sm transition hover:shadow-md"
    >
      <div
        className="flex h-28 items-end p-4 text-white"
        style={{ background: theme.gradient }}
      >
        <span className="mr-2 text-2xl">{theme.icon}</span>
        <h3 className="text-lg font-semibold">{trip.title}</h3>
      </div>
      <div className="bg-white p-4 text-sm text-slate-600">
        <p>{trip.destination ?? 'No destination set'}</p>
        {trip.start_date && (
          <p className="mt-1 text-slate-400">
            {trip.start_date}
            {trip.end_date ? ` → ${trip.end_date}` : ''}
          </p>
        )}
      </div>
    </Link>
  )
}
