import { addRow } from './actions'
import { getCredentials, getClient } from './supabase'

export const dynamic = 'force-dynamic'

const card = {
  maxWidth: 640,
  margin: '0 auto',
  background: '#171a21',
  border: '1px solid #262b36',
  borderRadius: 12,
  padding: '1.5rem',
}

export default async function Page() {
  const { url, key, keyName } = getCredentials()

  if (!url || !key) {
    return (
      <main style={card}>
        <h1 style={{ marginTop: 0, fontSize: '1.25rem' }}>No Supabase credentials</h1>
        <p style={{ color: '#9aa4b2' }}>
          Looked for NEXT_PUBLIC_SUPABASE_URL plus one of
          NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY.
          On Vercel these are injected by the Supabase integration.
        </p>
      </main>
    )
  }

  // The project ref is the subdomain — this is what proves which database
  // this deployment is actually talking to.
  const projectRef = new URL(url).hostname.split('.')[0]

  const supabase = getClient()
  const { data, error } = await supabase
    .from('test_table')
    .select('id, name, created_at, notes(id, body, created_at)')
    .order('created_at', { ascending: true })

  return (
    <main style={card}>
      <h1 style={{ marginTop: 0, fontSize: '1.25rem' }}>Supabase branch test</h1>

      <p style={{ color: '#9aa4b2', fontSize: '0.9rem' }}>
        Connected to project <span style={{ opacity: 0.7 }}>(via {keyName})</span>
      </p>
      <code
        style={{
          display: 'block',
          padding: '0.6rem 0.8rem',
          background: '#0f1115',
          border: '1px solid #262b36',
          borderRadius: 8,
          color: '#7ee2b8',
          wordBreak: 'break-all',
        }}
      >
        {projectRef}
      </code>

      <form action={addRow} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1.5rem 0' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            name="name"
            placeholder="Add a name"
            required
            style={{
              flex: 1,
              padding: '0.55rem 0.7rem',
              background: '#0f1115',
              border: '1px solid #262b36',
              borderRadius: 8,
              color: '#e6e8eb',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.55rem 1rem',
              background: '#3ecf8e',
              border: 0,
              borderRadius: 8,
              color: '#0f1115',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Insert
          </button>
        </div>
        <textarea
          name="note"
          placeholder="Add a note (optional)"
          rows={2}
          style={{
            padding: '0.55rem 0.7rem',
            background: '#0f1115',
            border: '1px solid #262b36',
            borderRadius: 8,
            color: '#e6e8eb',
            resize: 'vertical',
          }}
        />
      </form>

      {error ? (
        <p style={{ color: '#ff8f8f' }}>Query failed: {error.message}</p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
          {data.length === 0 && <li style={{ color: '#9aa4b2' }}>No rows yet.</li>}
          {data.map((row) => (
            <li key={row.id} style={{ marginBottom: '0.5rem' }}>
              {row.name}{' '}
              <span style={{ color: '#9aa4b2', fontSize: '0.85rem' }}>
                {new Date(row.created_at).toISOString().slice(0, 19).replace('T', ' ')}
              </span>
              {row.notes.length > 0 && (
                <ul style={{ margin: '0.25rem 0 0', paddingLeft: '1.1rem' }}>
                  {row.notes.map((note) => (
                    <li key={note.id} style={{ color: '#9aa4b2', fontSize: '0.85rem' }}>
                      {note.body}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
