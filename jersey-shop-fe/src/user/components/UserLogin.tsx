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
  
  if (!username || !password) {
    setError('Vui lòng nhập email/tên đăng nhập và mật khẩu');
    return;
  }

  setLoading(true);

  try {
    const response = await authService.login({ username, password });

    // Lấy danh sách roles từ response
    const roles = response.user.roles;

    // ⛔ CHẶN ADMIN: Nếu danh sách roles có chứa 'ROLE_ADMIN'
    if (roles.includes('ROLE_ADMIN') || roles.includes('ADMIN')) {
      setError('Tài khoản Admin không được phép đăng nhập tại trang dành cho khách hàng.');
      
      // Quan trọng: Phải gọi logout để xóa Token vừa được lưu trong LocalStorage
      authService.logout(); 
      setLoading(false);
      return; 
    }

    // ✅ NẾU LÀ USER: Cho phép vào trang cá nhân
    console.log('User Login successful');
    navigate('/dashboard');

  } catch (err: any) {
    if (err.response?.status === 401) {
      setError('Sai tên đăng nhập hoặc mật khẩu');
    } else {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    }
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

       
      </div>
    </div>
  );
}