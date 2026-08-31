'use server'

import { revalidatePath } from 'next/cache'
import { getClient } from './supabase'

export async function addRow(formData) {
  const name = formData.get('name')?.trim()
  if (!name) return

  const supabase = getClient()
  if (!supabase) return

  await supabase.from('test_table').insert({ name })
  revalidatePath('/')
}
