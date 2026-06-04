import type { Plan } from '@/types/plans'

const TYPE_ICON: Record<Plan['type'], string> = {
  flight: '✈️',
  lodging: '🏨',
  car: '🚗',
  dining: '🍽️',
  meeting: '📅',
  cruise: '🛳️',
  ferry: '⛴️',
  activity: '🎟️',
  parking: '🅿️',
  train: '🚆',
}

function formatTime(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** A single plan row on the timeline. */
export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
      <span className="text-xl">{TYPE_ICON[plan.type]}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-800">{plan.title}</p>
        {plan.start_address && (
          <p className="truncate text-xs text-slate-500">
            {plan.start_address}
          </p>
        )}
      </div>
      <div className="text-right">
        <p className="text-sm tabular-nums text-slate-700">
          {formatTime(plan.start_datetime)}
        </p>
        <span className="text-xs capitalize text-accent">{plan.status}</span>
      </div>
    </div>
  )
}
