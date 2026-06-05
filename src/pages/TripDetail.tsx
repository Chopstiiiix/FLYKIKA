import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTrip } from '@/hooks/useTrips'
import { useTripPlans } from '@/hooks/useTripPlans'
import { Icon } from '@/components/Icon'
import { MobileShell, RoundIconButton, StatusBar } from '@/components/MobileShell'
import { applyThemeVars } from '@/theme/themes'
import {
  DEMO_AUCKLAND_TRIP,
  DEMO_PLANS,
  formatTimeRange,
  formatTripDate,
} from '@/lib/travelAssets'
import type { Plan } from '@/types/plans'

function getPlanMeta(plan: Plan) {
  const isActivity = plan.type === 'activity'
  const entry =
    isActivity && 'voucherCode' in plan.details && plan.details.voucherCode
      ? plan.details.voucherCode.replace('NZS', 'NZ$')
      : 'NZ$32'

  return {
    category: plan.type === 'activity' ? 'Landmark' : plan.type,
    description:
      plan.start_address ??
      'The tallest freestanding structure in the Southern Hemisphere, offering panoramic views of Auckland.',
    entry,
  }
}

export function TripDetail() {
  const { tripId } = useParams<{ tripId: string }>()
  const { data: trip } = useTrip(tripId)
  const { data: plans } = useTripPlans(tripId)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current && trip) applyThemeVars(wrapperRef.current, trip.theme)
  }, [trip])

  const activeTrip = trip ?? (import.meta.env.DEV ? DEMO_AUCKLAND_TRIP : null)

  if (!activeTrip) {
    return (
      <MobileShell hideBottomNav>
        <div className="p-6 text-sm text-white/45">Loading trip...</div>
      </MobileShell>
    )
  }

  const displayPlans = plans && plans.length > 0 ? plans : DEMO_PLANS
  const selectedPlan = displayPlans[0]
  const meta = getPlanMeta(selectedPlan)
  const navItems = [
    { icon: 'home' as const, label: 'Home', to: '/' },
    { icon: 'menu' as const, label: 'Itinerary', to: `/trips/${activeTrip.id}` },
    { icon: 'sparkles' as const, label: 'AI', to: `/trips/${activeTrip.id}/plans/new` },
    { icon: 'user' as const, label: 'Profile', to: '/' },
  ]

  return (
    <MobileShell activeNav="Itinerary" navItems={navItems}>
      <div ref={wrapperRef} className="absolute inset-0 overflow-hidden bg-black">
        <section className="absolute inset-x-0 top-0 z-20 rounded-b-[24px] bg-black/92 pb-5 shadow-[0_18px_44px_rgba(0,0,0,.52)] backdrop-blur">
          <StatusBar />
          <header className="flex items-start justify-between px-6 pt-4">
            <div>
              <h1 className="text-[25px] font-black leading-tight text-white">
                Travel Itinerary
              </h1>
              <p className="mt-1 text-[15px] font-semibold text-white/48">
                {formatTripDate(activeTrip.start_date)} - {activeTrip.destination ?? 'Auckland'}
              </p>
            </div>
            <RoundIconButton icon="bell" label="Notifications" />
          </header>

          <div className="mt-5 flex gap-3 overflow-x-auto px-6 pb-1 scrollbar-none">
            {Array.from({ length: 7 }, (_, index) => {
              const active = index === 0
              return (
                <button
                  key={index + 1}
                  type="button"
                  className={
                    active
                      ? 'grid size-14 shrink-0 place-items-center rounded-full bg-[#e9ff3d] text-black'
                      : 'grid size-14 shrink-0 place-items-center rounded-full bg-white/[0.06] text-white/85'
                  }
                  aria-label={`Day ${index + 1}`}
                >
                  <span className="text-center text-[18px] font-black leading-none">
                    {index + 1}
                    <span className="mt-1 block text-[10px] font-bold">Day</span>
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <div className="travel-map absolute inset-0 top-[158px]">
          <div className="map-blocks absolute inset-[-20%]" />
          <svg
            className="absolute inset-0 z-10 h-full w-full"
            viewBox="0 0 430 720"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 210 C95 170 105 86 206 116 S302 260 430 214"
              fill="none"
              stroke="#e9ff3d"
              strokeDasharray="8 9"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              d="M52 436 C113 373 142 329 190 344 C244 362 220 475 322 462 C371 458 385 416 430 397"
              fill="none"
              stroke="#e9ff3d"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>

          <div className="absolute left-[56%] top-[19%] z-20 grid size-8 place-items-center rounded-full border border-[#e9ff3d] bg-black text-[#e9ff3d]">
            <Icon name="landmark" className="size-4" />
          </div>
          <div className="absolute right-8 top-[46%] z-20 grid size-8 place-items-center rounded-full border border-[#e9ff3d] bg-black text-[#e9ff3d]">
            <Icon name="sparkles" className="size-4" />
          </div>
          <div className="absolute left-16 top-[60%] z-20 grid size-8 place-items-center rounded-full border border-[#e9ff3d] bg-black text-[#e9ff3d]">
            <Icon name="ticket" className="size-4" />
          </div>
        </div>

        <article className="absolute inset-x-6 bottom-[106px] z-20 rounded-[28px] bg-black p-4 shadow-[0_18px_45px_rgba(0,0,0,.62)]">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/[0.08] text-white">
              <Icon name="landmark" className="size-6" />
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-[25px] font-black leading-tight text-white">
                {selectedPlan.title}
              </h2>
              <p className="text-sm font-semibold capitalize text-white/48">{meta.category}</p>
            </div>
          </div>

          <p className="mt-4 rounded-[18px] bg-white/[0.06] p-4 text-[14px] font-medium leading-relaxed text-white/65">
            {meta.description}
          </p>

          <div className="mt-4 flex items-center gap-5 text-sm font-bold text-white/48">
            <span className="flex items-center gap-2">
              <Icon name="clock" className="size-5 text-[#e9ff3d]" />
              {formatTimeRange(selectedPlan.start_datetime, selectedPlan.end_datetime)}
            </span>
            <span className="flex items-center gap-2">
              <Icon name="ticket" className="size-5 text-[#e9ff3d]" />
              Entry: <span className="text-base text-white">{meta.entry}</span>
            </span>
          </div>

          <Link
            to={`/trips/${activeTrip.id}/map`}
            className="mt-4 flex h-12 items-center justify-center rounded-full bg-white/[0.08] text-[15px] font-extrabold text-white"
          >
            Show Details
          </Link>
        </article>
      </div>
    </MobileShell>
  )
}
