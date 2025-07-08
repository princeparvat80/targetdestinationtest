import React, { useState, useEffect } from 'react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import UserForm from './components/UserForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState(''); // '' | 'login' | 'signup'

  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setView('');
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setView('');
    sessionStorage.removeItem('loggedInUser');
  };

  return (
    <div className="container">
      <header>
        <h1>Welcome to SmartForm</h1>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button onClick={() => setView('login')}>Login</button>
              <button onClick={() => setView('signup')}>Sign Up</button>
            </>
          )}
        </div>
      </header>
      <main>
        {!isLoggedIn && view === 'signup' && <SignupForm onSignup={() => setView('login')} />}
        {!isLoggedIn && view === 'login' && <LoginForm onLogin={handleLogin} />}
        <UserForm isLoggedIn={isLoggedIn} user={currentUser} />
      </main>
    </div>
  );
}

export default App;