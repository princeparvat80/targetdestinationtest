import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

function SignupForm({ onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!username || !password) {
      alert('Please fill all fields');
      return;
    }

    const existingUser = localStorage.getItem(`user_${username}`);
    if (existingUser) {
      alert('User already exists!');
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    localStorage.setItem(`user_${username}`, JSON.stringify({ password: hashedPassword, data: {} }));
    alert('Signup successful! You can now log in.');
    setUsername('');
    setPassword('');
    onSignup(); // switch to login view
  };

  return (
    <div className="auth-form">
      <h3>Sign Up</h3>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default SignupForm;