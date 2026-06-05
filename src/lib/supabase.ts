import { createClient } from '@supabase/supabase-js'
import { Preferences } from '@capacitor/preferences'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const hasSupabaseConfig = Boolean(url && anonKey)

if (!url || !anonKey) {
  // Surfaced loudly so a missing .env.local is obvious in dev.
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. ' +
      'Fill in .env.local and restart the dev server.',
  )
}

/**
 * Auth-token storage backed by @capacitor/preferences.
 *
 * On native (iOS/Android) this persists to the platform's secure-ish key/value
 * store rather than localStorage (which is unreliable inside a WebView). On the
 * web, Preferences falls back to localStorage automatically — so this one
 * adapter works everywhere.
 */
const capacitorStorage = {
  getItem: async (key: string): Promise<string | null> => {
    const { value } = await Preferences.get({ key })
    return value
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await Preferences.set({ key, value })
  },
  removeItem: async (key: string): Promise<void> => {
    await Preferences.remove({ key })
  },
}

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-anon-key',
  {
  auth: {
    storage: capacitorStorage,
    persistSession: true,
    autoRefreshToken: true,
    // No URL-hash session detection — native has no redirect URL bar.
    detectSessionInUrl: false,
  },
  },
)
