"use client";
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthPage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin'|'signup'>('signin');
  const [message, setMessage] = useState<string|undefined>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(undefined);
    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setMessage(error ? error.message : 'Signed in.');
      if (!error) window.location.href = '/app/studio';
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      setMessage(error ? error.message : 'Check your inbox to confirm email.');
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>{mode === 'signin' ? 'Sign in' : 'Sign up'}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">{mode === 'signin' ? 'Sign in' : 'Sign up'}</button>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
      <p style={{ marginTop: 12 }}>
        <button onClick={() => setMode(m => m === 'signin' ? 'signup' : 'signin')}>
          Switch to {mode === 'signin' ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </main>
  );
}

