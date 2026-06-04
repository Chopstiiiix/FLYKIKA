import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTrip } from '@/hooks/useTrips'
import { useTripPlans } from '@/hooks/useTripPlans'
import { Timeline } from '@/components/Timeline'
import { THEMES, applyThemeVars } from '@/theme/themes'

/**
 * SCAFFOLD STUB — applies the trip's theme to a wrapper (recolours the view via
 * --accent / --accent-gradient) and renders the timeline. Phase 1 adds the
 * add-plan affordance, edit/delete, and the map entry point.
 */
export function TripDetail() {
  const { tripId } = useParams<{ tripId: string }>()
  const { data: trip } = useTrip(tripId)
  const { data: plans } = useTripPlans(tripId)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current && trip) applyThemeVars(wrapperRef.current, trip.theme)
  }, [trip])

  if (!trip) return <p className="p-4 text-slate-400">Loading…</p>

  const theme = THEMES[trip.theme]

  return (
    <div ref={wrapperRef} className="mx-auto max-w-2xl">
      <header
        className="flex items-end justify-between p-6 text-white"
        style={{ background: 'var(--accent-gradient)' }}
      >
        <div>
          <span className="text-2xl">{theme.icon}</span>
          <h1 className="text-2xl font-bold">{trip.title}</h1>
          <p className="text-sm opacity-90">{trip.destination}</p>
        </div>
        <div className="flex flex-col gap-2 text-right text-sm">
          <Link to={`/trips/${trip.id}/map`} className="underline">
            Map view
          </Link>
          <Link to={`/trips/${trip.id}/plans/new`} className="underline">
            + Add plan
          </Link>
        </div>
      </header>

      <div className="p-4">
        <Timeline plans={plans ?? []} />
      </div>
    </div>
  )
}
