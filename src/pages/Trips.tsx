import { Link } from 'react-router-dom'
import { useTrips } from '@/hooks/useTrips'
import { useAuth } from '@/hooks/useAuth'
import { TripCard } from '@/components/TripCard'
import { Icon } from '@/components/Icon'
import { MobileShell, RoundIconButton, StatusBar } from '@/components/MobileShell'
import { DEMO_TRIPS, TRAVEL_IMAGES } from '@/lib/travelAssets'

function formatShortRange(start: string | null, end: string | null) {
  if (!start) return 'March 10-17, 2025'

  const first = new Date(start)
  const firstLabel = first.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  })

  if (!end) return firstLabel

  return `${firstLabel}-${new Date(end).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`
}

export function Trips() {
  const { data: trips, isLoading, error } = useTrips()
  const { signOut } = useAuth()
  const recentTrips = trips && trips.length > 0 ? trips : DEMO_TRIPS

  return (
    <MobileShell>
      <div className="phone-scroll noise-panel px-6 pb-32">
        <StatusBar />
        <header className="relative z-10 flex items-center justify-between pt-5">
          <button
            type="button"
            onClick={signOut}
            aria-label="Sign out"
            title="Sign out"
            className="flex min-w-0 items-center gap-3 text-left"
          >
            <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#e9ff3d]/60 bg-zinc-800">
              <span className="text-lg font-black text-[#e9ff3d]">A</span>
            </span>
            <span>
              <span className="block text-xl font-extrabold leading-tight text-white">
                Hi, Alex
              </span>
              <span className="block text-sm font-medium text-white/48">
                Good morning
              </span>
            </span>
          </button>
          <RoundIconButton icon="bell" label="Notifications" />
        </header>

        <section className="relative z-10 mt-7">
          <h1 className="max-w-[18rem] text-[32px] font-black leading-[1.08] text-white">
            Ready For Your <span className="font-medium italic text-[#e9ff3d]">Next Adventure?</span>
          </h1>

          <div className="mt-6 flex h-[58px] items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,.04)]">
            <Icon name="search" className="size-6 shrink-0 text-white/40" />
            <input
              className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-white outline-none placeholder:text-white/30"
              placeholder="Search cities, activities, or exp..."
              aria-label="Search cities, activities, or experiences"
            />
            <span className="h-8 w-px bg-white/14" />
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full text-white/45"
              aria-label="Voice search"
              title="Voice search"
            >
              <Icon name="mic" className="size-6" />
            </button>
          </div>
        </section>

        <section className="relative z-10 mt-8">
          <h2 className="text-xl font-extrabold text-white">AI Picks for You</h2>
          <Link
            to="/trips/new"
            className="group relative mt-5 block h-[292px] overflow-hidden rounded-[22px] bg-zinc-900"
          >
            <img
              src={TRAVEL_IMAGES.bali}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/8 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
              <div>
                <h3 className="text-[25px] font-extrabold leading-tight text-white">Bali</h3>
                <p className="mt-1 text-[15px] font-semibold text-white/82">
                  Perfect weather this week
                </p>
              </div>
              <span className="grid size-14 place-items-center rounded-full bg-[#e9ff3d] text-black shadow-[0_0_32px_rgba(233,255,61,.42)]">
                <Icon name="arrowUpRight" className="size-6" />
              </span>
            </div>
          </Link>
        </section>

        <section className="relative z-10 mt-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-white">Recent Trips</h2>
            <Link to="/trips/new" className="text-sm font-semibold text-white/70">
              View all
            </Link>
          </div>

          {isLoading && <p className="text-sm text-white/45">Loading trips...</p>}
          {error && <p className="text-sm text-red-300">{(error as Error).message}</p>}

          <div className="grid grid-cols-2 gap-3">
            {recentTrips.map((trip, index) => (
              <TripCard
                key={trip.id}
                trip={{
                  ...trip,
                  start_date: formatShortRange(trip.start_date, trip.end_date),
                  end_date: null,
                }}
                image={index === 0 ? TRAVEL_IMAGES.rome : TRAVEL_IMAGES.machuPicchu}
                to={trip.user_id === 'demo' ? '/trips/new' : undefined}
              />
            ))}
          </div>
        </section>
      </div>
    </MobileShell>
  )
}
