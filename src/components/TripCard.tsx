import { Link } from 'react-router-dom'
import { THEMES } from '@/theme/themes'
import type { Trip } from '@/types/trips'
import { Icon } from '@/components/Icon'

/** Compact trip summary used in the trips list. */
export function TripCard({
  trip,
  image,
  to,
}: {
  trip: Trip
  image?: string
  to?: string
}) {
  const theme = THEMES[trip.theme]
  const href = to ?? `/trips/${trip.id}`
  const cover = trip.cover_img ?? image

  return (
    <Link
      to={href}
      className="group relative block aspect-[1.02] overflow-hidden rounded-[20px] bg-zinc-900 shadow-[0_18px_40px_rgba(0,0,0,.35)] transition hover:-translate-y-0.5"
    >
      {cover ? (
        <img
          src={cover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: theme.gradient }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="line-clamp-2 text-[16px] font-extrabold leading-tight text-white">
          {trip.title}
        </p>
        <p className="mt-1 line-clamp-1 text-xs font-medium text-white/65">
          {trip.start_date ?? 'March 10'}
          {trip.end_date ? ` - ${trip.end_date}` : ''}
        </p>
      </div>
      <div className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-[#e9ff3d] text-black shadow-[0_0_28px_rgba(233,255,61,.46)]">
        <Icon name="arrowUpRight" className="size-5" />
      </div>
    </Link>
  )
}
