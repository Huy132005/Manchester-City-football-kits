import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../styles/login/Login.css';

export function UserDashboard() {
  const navigate = useNavigate();
  const user = authService.getUser();

  // 🔥 bảo vệ route
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // ❗ nếu là admin thì redirect về đúng trang
    if (authService.isAdmin()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="mancity-dashboard">
      <div className="mancity-dashboard-content">
        <div className="mancity-dashboard-header">
          <h1>⚽ Fan Dashboard</h1>
          <div className="badge">Manchester City</div>
        </div>

        <div className="user-info">
          <p><strong>👤 Tên:</strong> {user?.username}</p>
          <p><strong>📧 Email:</strong> {user?.email}</p>
          <p><strong>🎖️ Vai trò:</strong> {user?.roles.join(', ')}</p>
        </div>

        <button
          onClick={handleLogout}
          className="logout-button"
        >
          ✓ Đăng Xuất
        </button>
      </div>
    </div>
  );
}