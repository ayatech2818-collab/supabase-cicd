import { createClient } from '@supabase/supabase-js'

// The Supabase Vercel integration has used several names over time:
// NEXT_PUBLIC_SUPABASE_ANON_KEY (legacy) and
// NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (current). Accept whichever is set.
export function getCredentials() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL

  const keyName = [
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_PUBLISHABLE_KEY',
    'SUPABASE_ANON_KEY',
  ].find((name) => process.env[name])

  return { url, key: keyName && process.env[keyName], keyName }
}

export function getClient() {
  const { url, key } = getCredentials()
  return url && key ? createClient(url, key) : null
}
