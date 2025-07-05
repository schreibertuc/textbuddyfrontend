import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
  };

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const createCompanion = async () => {
    const { error } = await supabase.from('companions').insert({
      user_id: user.id,
      name,
      personality
    });
    if (error) {
      setMessage('❌ Error creating companion: ' + error.message);
    } else {
      setMessage('✅ Companion created successfully!');
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Sign Up / Log In</h2>
        <input type="email" placeholder="Email" id="email" />
        <input type="password" placeholder="Password" id="password" />
        <button onClick={() => signUp(email.value, password.value)}>Sign Up</button>
        <button onClick={() => login(email.value, password.value)}>Log In</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome {user.email}</h2>

      <h3>Create a New Companion</h3>
      <input
        type="text"
        placeholder="Companion Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />
      <textarea
        placeholder="Personality Prompt"
        value={personality}
        onChange={(e) => setPersonality(e.target.value)}
        rows={6}
        cols={50}
      /><br />
      <button onClick={createCompanion}>Create Companion</button>

      <p>{message}</p>
    </div>
  );
}

export default App;
