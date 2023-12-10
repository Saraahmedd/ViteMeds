"use client"
import GradientText from '@/components/GradientText';
import { Button, TextInput } from '@tremor/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [error, setError] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    const data = {
      username: username,
      password: password
    }

    const response = await fetch("/api/staff/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const res = await response.json();
    if (res.error) {
      setError(res.error.message);
    } else {
      setError('');
      window.location.replace('/dashboard');
    }
  };

  const checkLoggedIn = async () => {
    const isLoggedIn = await fetch("/api/staff/session");
    if ((await isLoggedIn.json()).success) {
      window.location.replace("/dashboard");
    } else {
      // do nothing
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, [])

  return (
    <main className='container mx-auto min-h-screen text-center flex justify-center items-center'>
      <div className='container w-fit mx-auto'>
        <GradientText wclass='text-9xl' text="seaats" />
        <form onSubmit={handleLogin}>
          <p className='text-rose-600'>{error}</p>
          <TextInput placeholder="Username" />
          <TextInput className='mt-5' type="password" placeholder="Password" />
          <Button size="md" variant="primary" className='mt-5' type='submit'>Log In</Button>
        </form>
      </div>
    </main>
  )
}
