import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm'; 
import DashboardPage from './DashboardPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<DashboardPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
