import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import Header from './header';
import DoctorHeader from './doctorHeader';

const DoctorHomePage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doctor/appointment/today',{headers:{
        'Authorization':`bearer ${localStorage.getItem('token')}`
      }});
      console.log(response.data)
      setAppointments(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <DoctorHeader/>
    <div>
      <h1>Doctor Home</h1>
      {/* <Link to="/appointment/new">Create New Appointment</Link> */}

      <h2>Today's Appointments</h2>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <div>
              <p>Patient Name: {appointment.patient_name}</p>
              <p>patient phone no: {appointment.patient_phone}</p>
              <p>Doctor name: {appointment.doctor.name}</p>
              <p>Date: {appointment.appointmentDate}</p>
              <p>Time: {appointment.appointmentTime}</p>
              </div>
              <div>
                {appointment.prescription?(<img src={'http://localhost:5000'+appointment.prescription}/>):(<p></p>)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
    </>
  );
};

export default DoctorHomePage;
