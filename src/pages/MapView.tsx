import { Link, useParams } from 'react-router-dom'
import { useTrip } from '@/hooks/useTrips'
import { useTripPlans } from '@/hooks/useTripPlans'
import { Icon } from '@/components/Icon'
import { MobileShell, RoundIconButton, StatusBar } from '@/components/MobileShell'
import {
  DEMO_AUCKLAND_TRIP,
  DEMO_PLANS,
  TRAVEL_IMAGES,
} from '@/lib/travelAssets'

export function MapView() {
  const { tripId } = useParams<{ tripId: string }>()
  const { data: trip } = useTrip(tripId)
  const { data: plans } = useTripPlans(tripId)
  const activeTrip = trip ?? (import.meta.env.DEV ? DEMO_AUCKLAND_TRIP : null)
  const displayPlans = plans && plans.length > 0 ? plans : DEMO_PLANS
  const plan = displayPlans[0]

  return (
    <MobileShell hideBottomNav>
      <div className="phone-scroll bg-black">
        <section className="relative min-h-[462px] overflow-hidden">
          <img
            src={activeTrip?.cover_img ?? TRAVEL_IMAGES.skyTower}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-transparent to-black" />
          <div className="relative z-10">
            <StatusBar />
            <header className="flex items-center justify-between px-6 pt-7">
              <RoundIconButton icon="arrowLeft" label="Back" to={`/trips/${tripId}`} />
              <RoundIconButton icon="bell" label="Notifications" />
            </header>
          </div>
        </section>

        <section className="-mt-14 px-6">
          <div className="relative z-10">
            <h1 className="text-[30px] font-black leading-tight text-white">{plan.title}</h1>
            <p className="mt-1 text-[17px] font-semibold text-white/52">
              Tallest Structure in New Zealand
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 text-[15px] font-bold text-white/58">
              <span className="flex items-center gap-2">
                <Icon name="clock" className="size-5 text-[#e9ff3d]" />
                9:00 AM - 10:00 PM
              </span>
              <span className="flex items-center gap-2">
                <Icon name="ticket" className="size-5 text-[#e9ff3d]" />
                Entry: <span className="text-[20px] font-black text-white">Paid</span>
              </span>
            </div>

            <div className="mt-5">
              <h2 className="text-[22px] font-black text-white">To-Do List:</h2>
              <ul className="mt-3 space-y-2 text-[15px] font-medium leading-relaxed text-white/82">
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-white" />
                  Try the SkyJump or SkyWalk for a thrill
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-white" />
                  Enjoy panoramic views from observation deck
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-white" />
                  Dine at the revolving restaurant
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <h2 className="text-[22px] font-black text-white">Speciality</h2>
              <p className="mt-3 text-[16px] font-medium leading-relaxed text-white/52">
                An iconic part of Auckland's skyline, the Sky Tower stands at 328 meters,
                offering breathtaking 360 degree views and adrenaline-pumping activities.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6 flex justify-center px-6 pb-16">
          <Link
            to={`/trips/${tripId}`}
            className="flex h-16 w-full max-w-[276px] items-center justify-center gap-3 rounded-full border border-[#e9ff3d]/70 bg-[#e9ff3d]/14 px-6 text-[15px] font-black text-white shadow-[0_0_34px_rgba(233,255,61,.34),inset_0_0_22px_rgba(233,255,61,.2)] backdrop-blur"
          >
            <Icon name="wand" className="size-6 text-white" />
            Start Journey
          </Link>
        </div>
      </div>
    </MobileShell>
  )
}
