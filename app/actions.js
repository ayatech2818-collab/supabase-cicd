'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

export async function addRow(formData) {
  const name = formData.get('name')?.trim()
  if (!name) return

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  await supabase.from('test_table').insert({ name })
  revalidatePath('/')
}
