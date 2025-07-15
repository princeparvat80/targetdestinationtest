import React, { useState, useEffect } from "react";

function Landing() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("preLoginData")) || {};
    setFormData({
      firstName: stored.firstName || "",
      lastName: stored.lastName || "",
      email: stored.email || ""
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email" && value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setEmailError("Enter a valid email address.");
    } else {
      setEmailError("");
    }
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      sessionStorage.setItem("preLoginData", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <main>
      <div className="big-invite">
        To get started, please <strong>Sign Up</strong> or <strong>Login</strong>
      </div>
      <div className="user-form" style={{ maxWidth: "400px", margin: "40px auto" }}>
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {emailError && <div className="error-text">{emailError}</div>}
      </div>
    </main>
  );
}

export default Landing;