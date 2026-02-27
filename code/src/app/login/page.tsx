'use client'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
  }

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Curriculum Builder</h1>
      <p style={styles.subtitle}>Sua jornada profissional começa aqui.</p>
      <button onClick={handleLogin} style={styles.button}>
        Entrar com Google
      </button>
    </main>
  )
}

const styles = {
  container: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#FDFFFC' },
  title: { color: '#011627', fontSize: '2rem', marginBottom: '8px' },
  subtitle: { color: '#60A5FA', marginBottom: '24px' },
  button: { padding: '12px 24px', backgroundColor: '#011627', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
}