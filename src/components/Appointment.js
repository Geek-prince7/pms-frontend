import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Appointment.css';
import Header from './header';

const NewAppointment = () => {
  const [doctorId, setDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [presc,setPresc]=useState(null);
  const [doctors, setDoctors] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isError,setIsError]=useState(false)

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doctor/all');
      setDoctors(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('doctorId', doctorId);
      formData.append('appointmentDate', appointmentDate);
      formData.append('appointmentTime', appointmentTime);
      formData.append('patient_phone',patientPhone);
      formData.append('patient_name',patientName);
      formData.append('prescription',presc)
      setIsError(false)

      const response = await axios.post('http://localhost:5000/appointment/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':`bearer ${localStorage.getItem('token')}`
        }
      });

      const appointment = response.data;
      setAppointmentDetails(appointment);
      setIsPopupOpen(true);
    } catch (error) {
      setIsError(true)
      console.error(error.response.data);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    window.location.href='/'
  };

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    // Fetch time slots from API or generate them programmatically
    const startTime = new Date();
    startTime.setHours(9, 0, 0); // Set start time to 8:00 AM
    const endTime = new Date();
    endTime.setHours(17, 0, 0); // Set end time to 5:00 PM

    const slots = [];

    // Iterate over time in 15-minute intervals and generate time slots
    while (startTime <= endTime) {
      const timeString = startTime.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      });
      
      
      
      startTime.setMinutes(startTime.getMinutes() + 15);
      const timeString2 = startTime.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      });

      slots.push(`${timeString}-${timeString2}`); // Increment time by 15 minutes
    }

    setTimeSlots(slots);
  };

  return (
    <>
    <Header/>
    <div className="new-appointment-container">
      <h1>New Appointment</h1>
      {isError? (<h3 className='error-msg'>This slot is booked! Try another</h3>):(<p></p>)}
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="form-group">
          <label>Patient name:</label>
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder='patient name...' required />
        </div>
        <div className="form-group">
          <label>Patient phone:</label>
          <input type="text" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} placeholder='patient phone number...' required />
        </div>
        <div className="form-group">
          <label>Select Doctor:</label>
          <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {`${doctor.name} (${doctor.speciality.specialization?doctor.speciality.specialization:doctor.speciality.type}) ${doctor.experience} + exp`}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Appointment Date:</label>
          <input type="date"  min={new Date().toISOString().split('T')[0]} value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Appointment Time:</label>
          <select value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)}>
            {/* Render time slots */}
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {/* <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required /> */}
        </div>
        <div className="form-group">
          <label>Prescription:</label>
          <input type="file" onChange={(e) => setPresc(e.target.files[0])} placeholder='patient name...'  />
        </div>
        <button type="submit">Create Appointment</button>
      </form>
      

      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Appointment Details</h2>
            <p>Appointment Id: {appointmentDetails.data.appointmentId}</p>
            <p>Doctor: {appointmentDetails.data.doctor.name}</p>
            <p>Patient: {appointmentDetails.data.patient_name}</p>
            <p>phone no: {appointmentDetails.data.patient_phone}</p>
            <p>Date: {appointmentDetails.data.appointmentDate}</p>
            <p>Time: {appointmentDetails.data.appointmentTime}</p>
            <button onClick={closePopup}>Done</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default NewAppointment;
