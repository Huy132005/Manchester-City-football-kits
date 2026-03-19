import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../styles/login/Login.css';

export function UserLogin() {
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
      setError('Vui lòng nhập email/tên đăng nhập và mật khẩu');
      return;
    }

    const response = await authService.login({ username, password });

    console.log('Login successful:', response);

    // Lấy role
    const roles = response.user.roles;

    if (roles.includes('ADMIN')) {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }

  } catch (err: any) {
    // ✅ nếu backend trả 401 với message "Sai tài khoản hoặc mật khẩu"
    if (err.response?.status === 401) {
      setError('Sai tên đăng nhập hoặc mật khẩu'); 
    } else {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    }
    console.error('User login error:', err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="mancity-container">
      <div className="mancity-box user">
        <div className="mancity-box-header">
          <div className="badge">Manchester City</div>
          <h1>Login</h1>
          <p>Đăng nhập tài khoản cá nhân</p>
        </div>

        <form onSubmit={handleLogin} className="mancity-form">
          <div className="form-group">
            <label htmlFor="username">📧 Email hoặc Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập email hoặc tên đăng nhập"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔐 Mật khẩu</label>
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
            className="mancity-button primary"
            disabled={loading}
          >
            {loading ? '⏳ Đang đăng nhập...' : '✓ Đăng Nhập'}
          </button>
        </form>

        <div className="mancity-links">
          <a href="#forgot-password">Quên mật khẩu?</a>
          <span>•</span>
          <Link to="/signup">Đăng ký</Link>
        </div>

        <div className="mancity-footer">
          <a href="/admin/login">↔️ Admin?</a>
        </div>
      </div>
    </div>
  );
}