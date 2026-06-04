import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemePicker } from '@/components/ThemePicker'
import { THEMES } from '@/theme/themes'
import { useCreateTrip } from '@/hooks/useTrips'
import type { TripTheme } from '@/types/trips'

/**
 * SCAFFOLD STUB — theme picker + minimal create form to demonstrate the flow
 * (theme swatches → suggested plan types). Phase 1 adds dates, cover image,
 * destination autocomplete, and validation.
 */
export function NewTrip() {
  const navigate = useNavigate()
  const createTrip = useCreateTrip()
  const [title, setTitle] = useState('')
  const [theme, setTheme] = useState<TripTheme>('city_break')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trip = await createTrip.mutateAsync({ title, theme })
    navigate(`/trips/${trip.id}`)
  }

  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="mb-6 text-2xl font-bold">New Trip</h1>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Weekend in Lisbon"
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Theme</label>
          <ThemePicker value={theme} onChange={setTheme} />
          <p className="mt-3 text-sm text-slate-500">
            Suggested plans:{' '}
            {THEMES[theme].suggestedPlanTypes.join(', ')}
          </p>
        </div>

        <button
          type="submit"
          disabled={createTrip.isPending}
          className="w-full rounded-lg p-3 font-medium text-white disabled:opacity-50"
          style={{ background: THEMES[theme].gradient }}
        >
          {createTrip.isPending ? 'Creating…' : 'Create trip'}
        </button>
      </form>
    </div>
  )
}
