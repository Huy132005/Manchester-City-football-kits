import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './user/pages/LoginPage';
import { UserSignupPage } from './user/pages/UserSignupPage';
import { AdminLoginPage } from './admin/pages/AdminLoginPage';
import { UserDashboard } from './user/pages/UserDashboard';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import manCityLogo from './img/ManCity.png';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <header className="mancity-header">
        <a href="/" className="mancity-logo">
          <img src={manCityLogo} alt="Manchester City" />
          <span className="mancity-logo-text">Manchester City football kits</span>
        </a>
      </header>
      <Routes>
        {/* User Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
