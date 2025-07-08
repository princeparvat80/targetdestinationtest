import React, { useState, useEffect } from 'react';

function UserForm({ isLoggedIn, user }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    ecid: ''
  });
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const storedPreLogin = JSON.parse(sessionStorage.getItem('preLoginData')) || {};

    if (!isLoggedIn) {
      setFormData((prev) => ({
        ...prev,
        firstName: storedPreLogin.firstName || '',
        lastName: storedPreLogin.lastName || '',
        email: storedPreLogin.email || ''
      }));
    }

    if (isLoggedIn && user?.data) {
      setFormData({
        firstName: user.data.firstName || '',
        lastName: user.data.lastName || '',
        email: user.data.email || '',
        dob: user.data.dob || '',
        gender: user.data.gender || '',
        ecid: user.data.ecid || ''
      });
    }
  }, [isLoggedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (!isLoggedIn && ['firstName', 'lastName', 'email'].includes(name)) {
      const preLogin = { ...formData, [name]: value };
      sessionStorage.setItem('preLoginData', JSON.stringify(preLogin));
    }

    if (name === 'email') {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = () => {
    const requiredFields = ['firstName', 'lastName', 'email'];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        alert('Please fill required fields');
        return;
      }
    }

    if (isLoggedIn && formData.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (isLoggedIn && user) {
      const updatedUser = {
        ...user,
        data: formData
      };
      const stored = JSON.parse(localStorage.getItem(`user_${user.username}`));
      localStorage.setItem(`user_${user.username}`, JSON.stringify({ password: stored.password, data: formData }));
      sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      alert('Data saved!');
    } else {
      sessionStorage.setItem('preLoginData', JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      }));
      alert('Pre-login data saved!');
    }
  };

  return (
    <div className="user-form">
      <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      {emailError && <div className="error-text">{emailError}</div>}

      {isLoggedIn && (
        <>
          <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} />
          <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
          <input name="ecid" placeholder="ECID" value={formData.ecid} onChange={handleChange} />
        </>
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UserForm;
