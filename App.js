import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm'; 
import DashboardPage from './DashboardPage';
import PrimaryPage from './PrimaryPage';
import SecondaryPage from './SecondaryPage';
import HighSchoolPage from './HighSchoolPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<DashboardPage />}/>
        <Route path="/primary" element={<PrimaryPage/>}/>
        <Route path="/seconday" element={<SecondaryPage/>}/>
        <Route path="/seniors" element={<HighSchoolPage/>}/>
      </Routes>
    </Router>

  );
}

export default App;
