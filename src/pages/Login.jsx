import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', email);
      setMessage('Login successful!');
      setTimeout(() => navigate('/'), 1000); // Redirect to home
    } else {
      setMessage('Invalid credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded">
      <h2 className="text-2xl mb-4">Customer Login</h2>
      {message && <div className="mb-3 text-red-400">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="block w-full mb-3 p-2 text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="block w-full mb-3 p-2 text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 px-4 py-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;