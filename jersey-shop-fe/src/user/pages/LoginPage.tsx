import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '../components/UserLogin';
import { authService } from '../../services/authService';

export function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      if (authService.isAdmin()) {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  return <UserLogin />;
}