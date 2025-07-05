// main.jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { supabase } from './supabaseClient'

function App() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [personality, setPersonality] = useState('')
  const [message, setMessage] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleAuth = async (e) => {
    e.preventDefault()
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) {
      alert(error.message)
    }
  }

  const createCompanion = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('companions').insert([
      {
        user_id: session.user.id,
        name,
        personality
      }
    ])

    if (error) {
      alert('❌ ' + error.message)
    } else {
      setMessage('✅ Companion created!')
      setName('')
      setPersonality('')
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (!session) {
    return (
      <div>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need to sign up?' : 'Already have an account?'}
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2>Welcome, {session.user.email}</h2>
      <button onClick={logout}>Log Out</button>

      <hr />

      <h3>Create a new companion</h3>
      <form onSubmit={createCompanion}>
        <input
          placeholder="Companion name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Personality prompt"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
        />
        <button type="submit">Save Companion</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
