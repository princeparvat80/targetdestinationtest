import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
    if (isLoggedIn && user?.uid) {
      // Load saved profile (if any)
      getDoc(doc(db, "users", user.uid)).then((userDoc) => {
        if (userDoc.exists() && userDoc.data().data) {
          setFormData({
            ...{
              firstName: '',
              lastName: '',
              email: '',
              dob: '',
              gender: '',
              ecid: ''
            },
            ...userDoc.data().data,
            email: user.username // Set email from auth account
          });
        }
      });
    } else {
      const storedPreLogin = JSON.parse(sessionStorage.getItem('preLoginData')) || {};
      setFormData((prev) => ({
        ...prev,
        firstName: storedPreLogin.firstName || '',
        lastName: storedPreLogin.lastName || '',
        email: storedPreLogin.email || ''
      }));
    }
    // eslint-disable-next-line
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

  const handleSubmit = async () => {
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
      // Save to Firestore profile
      await setDoc(doc(db, "users", user.uid), {
        username: user.username,
        data: formData
      });
      sessionStorage.setItem('loggedInUser', JSON.stringify({ ...user, data: formData }));
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