'use server'

import { revalidatePath } from 'next/cache'
import { getClient } from './supabase'

export async function addRow(formData) {
  const name = formData.get('name')?.trim()
  if (!name) return

  const note = formData.get('note')?.trim()
  const supabase = getClient()
  if (!supabase) return

  const { data } = await supabase.from('test_table').insert({ name }).select('id').single()

  if (note && data) {
    await supabase.from('notes').insert({ test_table_id: data.id, body: note })
  }

  revalidatePath('/')
}
