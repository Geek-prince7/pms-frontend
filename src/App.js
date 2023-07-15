import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import PatientLogin from './components/PatientLogin';
import PatientSignup from './components/signup';
import NewAppointment from './components/Appointment';
import HomePage from './components/home';
import DoctorLogin from './components/doctorLogin';
import DoctorSignup from './components/doctorSignup';
import DoctorHomePage from './components/DoctorHome';
// import DoctorSignup from './components/doctorSignup';
// import 

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/doctor' element={<DoctorHomePage/>}/>
        <Route path='/login' element={<PatientLogin/>} />
        <Route path='/doctor/login' element={<DoctorLogin/>} />
        <Route path='/appointment/new' element={<NewAppointment/>} />
        <Route path='/register' element={<PatientSignup/>}/>
        <Route path='/doctor/signup' element={<DoctorSignup/>}/>

      </Routes>
    </Router>
    
  );
}


export default App;
