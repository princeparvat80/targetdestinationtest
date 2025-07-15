import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ProfileForm from "./components/ProfileForm";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userSession = sessionStorage.getItem("loggedInUser");
    setIsLoggedIn(!!userSession);
  }, []);

  return (
    <Router>
      <div className="main-card-app">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={
            isLoggedIn ? (
              <ProfileForm />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;