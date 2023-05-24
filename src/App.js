import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import PatientLogin from './components/PatientLogin';
import PatientSignup from './components/signup';
import NewAppointment from './components/Appointment';
import HomePage from './components/home';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<PatientLogin/>} />
        <Route path='/appointment/new' element={<NewAppointment/>} />
        <Route path='/register' element={<PatientSignup/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
