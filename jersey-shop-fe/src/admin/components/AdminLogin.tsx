import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../styles/login/Login.css';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!username || !password) {
        setError('Vui lòng nhập tên đăng nhập và mật khẩu');
        setLoading(false);
        return;
      }

      // ✅ dùng API chung
      const response = await authService.login({ username, password });

      const userRoles = response.user.roles;

      // ❗ check quyền admin
      if (!userRoles.includes('ADMIN') && !userRoles.includes('SUPERADMIN')) {
        setError('Tài khoản của bạn không có quyền admin');
        authService.logout();
        setLoading(false);
        return;
      }

      console.log('Admin login successful:', response);
      navigate('/admin/dashboard');

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Đăng nhập thất bại';
      setError(errorMessage);
      console.error('Admin login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mancity-container">
      <div className="mancity-box admin">
        <div className="mancity-box-header">
          <div className="badge" style={{ background: '#DC143C' }}>⚙️ Admin Panel</div>
          <h1>Admin Login</h1>
          <p>Đăng nhập hệ thống quản trị</p>
        </div>

        <form onSubmit={handleLogin} className="mancity-form">
          <div className="form-group">
            <label htmlFor="username">👤 Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">🔐 
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              disabled={loading}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="mancity-button admin"
            disabled={loading}
          >
            {loading ? '⏳ Đang đăng nhập...' : '✓ Đăng Nhập'}
          </button>
        </form>

        <div className="mancity-links">
          <a href="/login">↔️ User Login</a>
        </div>
      </div>
    </div>
  );
}