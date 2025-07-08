import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const stored = localStorage.getItem(`user_${username}`);
    if (!stored) {
      alert('User not found');
      return;
    }

    const userObj = JSON.parse(stored);
    const passwordMatch = bcrypt.compareSync(password, userObj.password);

    if (passwordMatch) {
      onLogin({ username, data: userObj.data });
      setUsername('');
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="auth-form">
      <h3>Login</h3>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginForm;