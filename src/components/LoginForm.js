import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LoginForm({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Save minimal user info to session
      sessionStorage.setItem("loggedInUser", JSON.stringify({
        uid: result.user.uid,
        email: result.user.email
      }));
      setIsLoggedIn(true);
      navigate("/profile");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    <main>
      <form className="auth-form" style={{ maxWidth: 350, margin: "40px auto" }} onSubmit={handleLogin}>
        <h3>Login</h3>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
    </main>
  );
}

export default LoginForm;