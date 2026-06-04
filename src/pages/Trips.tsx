import { Link } from 'react-router-dom'
import { useTrips } from '@/hooks/useTrips'
import { useAuth } from '@/hooks/useAuth'
import { TripCard } from '@/components/TripCard'

/** SCAFFOLD STUB — lists trips. Phase 1 adds search/sort/empty-state polish. */
export function Trips() {
  const { data: trips, isLoading, error } = useTrips()
  const { signOut } = useAuth()

  return (
    <div className="mx-auto max-w-2xl p-4">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Trips</h1>
        <div className="flex gap-2">
          <Link
            to="/trips/new"
            className="rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ background: 'var(--accent-gradient)' }}
          >
            + New trip
          </Link>
          <button
            onClick={signOut}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
          >
            Sign out
          </button>
        </div>
      </header>

      {isLoading && <p className="text-slate-400">Loading…</p>}
      {error && <p className="text-red-600">{(error as Error).message}</p>}
      {trips && trips.length === 0 && (
        <p className="py-12 text-center text-slate-400">
          No trips yet — create your first one.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {trips?.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}
