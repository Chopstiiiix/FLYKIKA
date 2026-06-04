import { Link, useParams } from 'react-router-dom'

/**
 * SCAFFOLD STUB — placeholder for the create/edit plan screen.
 *
 * Phase 1 builds the real editor: pick a plan `type`, render the shared fields
 * (time, location, confirmation, status) plus a per-type sub-form driven by the
 * discriminated `details` union in `src/types/plans.ts`, then persist via
 * `useCreatePlan` / `useUpdatePlan`.
 */
export function PlanEditor() {
  const { tripId, planId } = useParams<{ tripId: string; planId?: string }>()
  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="mb-2 text-2xl font-bold">
        {planId ? 'Edit plan' : 'New plan'}
      </h1>
      <p className="mb-6 text-slate-500">
        Plan editor — to be implemented in Phase 1 (10 plan types via the JSONB
        details model).
      </p>
      <Link to={`/trips/${tripId}`} className="text-accent underline">
        ← Back to trip
      </Link>
    </div>
  )
}
