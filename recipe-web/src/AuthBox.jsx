import { useState } from 'react'
import { supabase } from './supabase'

export default function AuthBox() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({ 
        email, 
        password
    });
    setMessage(error ? error.message : "Account created")
  }

  async function logIn() {
    const {error} = await supabase.auth.signInWithPassword({
        email,
        password
    });

    setMessage(error ? error.message : "Logged in")
  }

  return(  
    <div className="auth-box">
        <input type="email" placeholder="email" value={email}
        onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <button onClick={logIn}> Log in </button>
            <button onClick={signUp}> Sign up </button>
            {message && <p>{message}</p>}
    </div>
  )
}