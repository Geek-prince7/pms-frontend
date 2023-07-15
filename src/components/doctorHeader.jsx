import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './header.css'
const DoctorHeader = () => {
  const [patientInfo, setPatientInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchPatientInfo();
  }, []);

  const fetchPatientInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doctor/info',{headers:{
        'Authorization':`bearer ${localStorage.getItem('token')}`
      }});
      console.log(response.data)
      setPatientInfo(response.data);
      setIsLoggedIn(true); // Assuming successful response means the patient is logged in
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    // Redirect or perform any additional actions as needed
    localStorage.removeItem('token')
    setIsLoggedIn(false);
    window.location.href='/doctor/login'
  };
  const handleLogin = () => {
    // Handle logout logic here
    // Redirect or perform any additional actions as needed
    window.location.href='/doctor/login'
  };

  return (
    <header>
      {/* <h1>Online Out-Patient Management System</h1> */}
      {isLoggedIn && patientInfo.code==1000 ? (
        <div className='cont-head'>
          <p>Welcome, {patientInfo.data.name}</p>
          <p>Email: {patientInfo.data.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className='cont-head'>
          <p>Please login to continue</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </header>
  );
};

export default DoctorHeader;
