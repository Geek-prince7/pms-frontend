import React, { useState } from 'react';
import axios from 'axios';
import './PatientLogin.css';
import Header from './header';

const PatientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError,setIsError]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);
      setIsError(false);
      const response = await axios.post('http://localhost:5000/patient/login',formData,{headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }});

      // Handle successful login response
      console.log(response.data);
      localStorage.setItem('token',response.data.data.token)
      window.location.href='/'
    } catch (error) {
      // Handle login error
      setIsError(true)
      console.error(error.response.data);
    }
  };

  return (
    <>
    <Header/>
    <div className="login-container">
      <h1>Patient Login</h1>
      {isError? (<h3 className='error-msg'>Invalid email/password</h3>):(<p></p>)}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p><a href='/doctor/login'>doctor login</a></p>
    </div>
    </>
  );
};

export default PatientLogin;
