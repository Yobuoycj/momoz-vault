import React, { useState } from 'react';

function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple localStorage demo (replace with real API in production)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      setMessage('Account already exists.');
      return;
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('Account created! You can now log in.');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded">
      <h2 className="text-2xl mb-4">Create Account</h2>
      {message && <div className="mb-3 text-green-400">{message}</div>}
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
        <button className="bg-green-600 px-4 py-2 rounded" type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;