import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Modal from "./SuccessModal";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowModal(true);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <main>
      <form className="auth-form" style={{ maxWidth: 350, margin: "40px auto" }} onSubmit={handleSignup}>
        <h3>Sign Up</h3>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
      </form>
      <Modal
        show={showModal}
        title="Signup Successful!"
        message="Your account has been created. Please login to continue."
        onClose={handleModalClose}
      />
    </main>
  );
}

export default SignupForm;