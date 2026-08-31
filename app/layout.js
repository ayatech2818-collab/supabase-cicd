export const metadata = {
  title: 'Supabase Branch Test',
  description: 'Shows which Supabase branch this deployment is talking to.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: '2.5rem 1.25rem',
          background: '#0f1115',
          color: '#e6e8eb',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          lineHeight: 1.5,
        }}
      >
        {children}
      </body>
    </html>
  )
}
