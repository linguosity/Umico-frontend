// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

//Django docs
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
      
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Handle successful login, e.g., store token, redirect
      router.push('/');
    } else {
      // Handle error
      alert('Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
