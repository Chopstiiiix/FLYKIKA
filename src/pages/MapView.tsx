import { Link, useParams } from 'react-router-dom'
import { useTripPlans } from '@/hooks/useTripPlans'
import { MapCanvas } from '@/components/MapCanvas'
import type { MapMarker, MapRoute } from '@/lib/map/provider'

/**
 * SCAFFOLD STUB — view layer over plan locations (NOT a plan type). Plots each
 * plan's start_location and routes consecutive items. Phase 2 fleshes out
 * directions, selection, and the provider swap. Map backend is pluggable via
 * `src/lib/map/provider.ts`.
 */
export function MapView() {
  const { tripId } = useParams<{ tripId: string }>()
  const { data: plans } = useTripPlans(tripId)

  const located = (plans ?? []).filter((p) => p.start_location)
  const markers: MapMarker[] = located.map((p) => ({
    id: p.id,
    label: p.title,
    position: {
      lng: p.start_location!.coordinates[0],
      lat: p.start_location!.coordinates[1],
    },
  }))
  const routes: MapRoute[] =
    markers.length > 1
      ? [{ id: 'itinerary', points: markers.map((m) => m.position) }]
      : []

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b p-3">
        <h1 className="font-semibold">Map</h1>
        <Link to={`/trips/${tripId}`} className="text-accent underline">
          ← Back
        </Link>
      </header>
      <div className="relative flex-1">
        <MapCanvas markers={markers} routes={routes} />
      </div>
    </div>
  )
}
