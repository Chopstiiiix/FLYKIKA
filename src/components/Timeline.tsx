import type { Plan } from '@/types/plans'
import { PlanCard } from './PlanCard'

function dayKey(iso: string | null): string {
  if (!iso) return 'Unscheduled'
  return new Date(iso).toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

/** Plans grouped by day. Phase 1 will add drag-to-reorder + inline edit. */
export function Timeline({ plans }: { plans: Plan[] }) {
  const groups = new Map<string, Plan[]>()
  for (const plan of plans) {
    const key = dayKey(plan.start_datetime)
    const list = groups.get(key) ?? []
    list.push(plan)
    groups.set(key, list)
  }

  if (plans.length === 0) {
    return (
      <p className="py-12 text-center text-slate-400">
        No plans yet. Add a flight, lodging, dining…
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {[...groups.entries()].map(([day, dayPlans]) => (
        <section key={day}>
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {day}
          </h4>
          <div className="space-y-2 border-l-2 border-accent/40 pl-3">
            {dayPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
