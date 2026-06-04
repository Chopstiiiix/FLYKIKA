import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Plan, PlanInsert } from '@/types/plans'

const plansKey = (tripId: string) => ['trips', tripId, 'plans'] as const

/** All plans for a trip, ordered chronologically for the timeline. */
export function useTripPlans(tripId: string | undefined) {
  return useQuery({
    queryKey: plansKey(tripId ?? ''),
    enabled: !!tripId,
    queryFn: async (): Promise<Plan[]> => {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('trip_id', tripId)
        .order('start_datetime', { ascending: true, nullsFirst: false })
      if (error) throw error
      return data as unknown as Plan[]
    },
  })
}

export function useCreatePlan(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: PlanInsert): Promise<Plan> => {
      const { data, error } = await supabase
        .from('plans')
        // Cast: DB types not generated yet (Phase 1 runs `supabase gen types`).
        // The PlanInsert union otherwise confuses supabase-js' insert typing.
        .insert(input as Record<string, unknown>)
        .select('*')
        .single()
      if (error) throw error
      return data as unknown as Plan
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: plansKey(tripId) }),
  })
}

export function useUpdatePlan(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      patch,
    }: {
      id: string
      patch: Partial<PlanInsert>
    }): Promise<Plan> => {
      const { data, error } = await supabase
        .from('plans')
        .update(patch as Record<string, unknown>)
        .eq('id', id)
        .select('*')
        .single()
      if (error) throw error
      return data as unknown as Plan
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: plansKey(tripId) }),
  })
}

export function useDeletePlan(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from('plans').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: plansKey(tripId) }),
  })
}
