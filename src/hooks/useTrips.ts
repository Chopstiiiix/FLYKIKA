import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { hasSupabaseConfig, supabase } from '@/lib/supabase'
import type { Trip, TripInsert } from '@/types/trips'

const tripsKey = ['trips'] as const
const tripKey = (id: string) => ['trips', id] as const

/** All trips for the signed-in user (RLS scopes the rows). */
export function useTrips() {
  return useQuery({
    queryKey: tripsKey,
    enabled: hasSupabaseConfig,
    queryFn: async (): Promise<Trip[]> => {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('start_date', { ascending: true, nullsFirst: false })
      if (error) throw error
      return data as Trip[]
    },
  })
}

export function useTrip(id: string | undefined) {
  return useQuery({
    queryKey: tripKey(id ?? ''),
    enabled: !!id && hasSupabaseConfig,
    queryFn: async (): Promise<Trip> => {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data as Trip
    },
  })
}

export function useCreateTrip() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: TripInsert): Promise<Trip> => {
      const { data: userData } = await supabase.auth.getUser()
      const user_id = userData.user?.id
      if (!user_id) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('trips')
        .insert({ ...input, user_id })
        .select('*')
        .single()
      if (error) throw error
      return data as Trip
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: tripsKey }),
  })
}
