import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './doctorSignup.css';
import DoctorHeader from './doctorHeader';

const DoctorSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [exp, setExp] = useState('');
  const [slot, setSlot] = useState([]);
  const [speciality, setSpeciality] = useState('');
  const [slotDoctor,setSlotsDoctor]=useState('')
  const [specialities,setSpecalities]=useState([])

  useEffect(() => {
    fetchSlots();
    fetchSpecality();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get('http://localhost:5000/slot/all');
      setSlot(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSpecality = async () => {
    try {
      const response = await axios.get('http://localhost:5000/speciality/all');
      setSpecalities(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password',password)
      formData.append('experience', exp);
      formData.append('slot', slotDoctor);
      formData.append('speciality',speciality);
    //   formData.append('phone_no', phone);

      const response = await axios.post('http://localhost:5000/doctor/register', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // Handle successful registration response
      console.log(response.data);
      window.location.href='/doctor/login'
    } catch (error) {
      // Handle registration error
      console.error(error.response.data);
    }
  };

  return (
    <>
    <DoctorHeader/>
    <div className="signup-container">
      <h1>Doctor Signup</h1>
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
          <label>Experience:</label>
          <input type="text" value={exp} onChange={(e) => setExp(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Slot:</label>
          {/* <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /> */}
          <select value={slotDoctor} onChange={(e) => setSlotsDoctor(e.target.value)} required>
            <option value="">Select a slot</option>
            {slot.map((s) => (
              <option key={s._id} value={s._id}>
                {`${s.startTime}-${s.endTime}`}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Speciality:</label>
          
          <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} required>
            <option value="">Select a speciality</option>
            {specialities.map((s) => (
              <option key={s._id} value={s._id}>
                {`${s.type?s.type:s.specialization}`}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Signup</button>
      </form>
      <div className="login-link">
        Already registered? <Link to="/doctor/login">Sign in</Link>
      </div>
    </div>
    </>
  );
};

export default DoctorSignup;
