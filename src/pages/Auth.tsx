import { useState } from 'react'
import { supabase } from '@/lib/supabase'

/**
 * SCAFFOLD STUB. Minimal email magic-link sign-in to prove the auth wiring.
 * Phase 1 will flesh this out (password/OAuth, validation, error states).
 */
export function Auth() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center p-6">
      <h1 className="mb-1 text-2xl font-bold">FlyKika</h1>
      <p className="mb-6 text-sm text-slate-500">Sign in to plan your trips.</p>
      {sent ? (
        <p className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
          Check {email} for a magic link.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
          <button
            type="submit"
            className="w-full rounded-lg p-3 font-medium text-white"
            style={{ background: 'var(--accent-gradient)' }}
          >
            Send magic link
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      )}
    </div>
  )
}
