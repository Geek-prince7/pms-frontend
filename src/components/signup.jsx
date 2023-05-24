import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PatientSignup.css';

const PatientSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('age', age);
      formData.append('phone_no', phone);

      const response = await axios.post('http://localhost:5000/patient/register', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // Handle successful registration response
      console.log(response.data);
      window.location.href='/login'
    } catch (error) {
      // Handle registration error
      console.error(error.response.data);
    }
  };

  return (
    <div className="signup-container">
      <h1>Patient Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit">Signup</button>
      </form>
      <div className="login-link">
        Already registered? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
};

export default PatientSignup;
