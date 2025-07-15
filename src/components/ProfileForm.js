import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const currentUserData = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: currentUserData.email || "",
    dob: "",
    gender: "",
    ecid: ""
  });

  useEffect(() => {
    // Merge pre-login info
    const preLogin = JSON.parse(sessionStorage.getItem("preLoginData")) || {};
    setFormData((prev) => ({
      ...prev,
      firstName: preLogin.firstName || "",
      lastName: preLogin.lastName || "",
      email: currentUserData.email || preLogin.email || ""
    }));

    // Load saved profile if it exists
    const fullProfile = JSON.parse(sessionStorage.getItem("userProfileData") || "{}");
    if (fullProfile.email === currentUserData.email) {
      setFormData(fullProfile);
    }
  }, [currentUserData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Save profile data per user/email
    sessionStorage.setItem("userProfileData", JSON.stringify(formData));
    alert("Profile saved successfully!");
  };

  return (
    <main>
      <form className="user-form" style={{ maxWidth: 400, margin: "40px auto" }} onSubmit={e => {e.preventDefault(); handleSubmit();}}>
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required/>
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required/>
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} />
        <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
        <input name="ecid" placeholder="ECID" value={formData.ecid} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default ProfileForm;