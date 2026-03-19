import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../styles/login/Login.css';

export function UserSignup() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');      // lỗi chung
  const [success, setSuccess] = useState('');  // thông báo thành công
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // -----------------------
      // 🔹 FRONTEND VALIDATION
      // -----------------------
      if (!username || !fullName || !email || !password || !confirmPassword || !phone || !address) {
        setError('Vui lòng điền đầy đủ tất cả các trường');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Mật khẩu và xác nhận mật khẩu không khớp');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Email không hợp lệ');
        setLoading(false);
        return;
      }

      // -----------------------
      // 🔹 CALL API SIGNUP
      // -----------------------
      const response = await authService.signup({
        username,
        full_name: fullName,
        email,
        password,
        confirmPassword,
        phone,
        address,
      });

      console.log('Signup successful:', response);

      // 🔹 Hiển thị thông báo thành công
      setSuccess('Đăng ký thành công! Chuyển hướng tới trang đăng nhập...');
      // Redirect to login after 2s
      setTimeout(() => navigate('/login'), 2000);

    } catch (err: any) {
      // -----------------------
      // 🔹 HANDLE ERROR FROM BACKEND
      // -----------------------
      if (err.response?.status === 400) {
        const data = err.response.data; // { email: "...", username: "...", phone: "..." }
        const messages = Object.values(data).join('. ');
        setError(messages || 'Đăng ký thất bại');
      } else if (err.response?.status === 409) {
        setError('Tên đăng nhập hoặc email đã được sử dụng');
      } else {
        setError(err.response?.data?.message || 'Đăng ký thất bại');
      }
      console.error('User signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mancity-container">
      <div className="mancity-box user">
        <div className="mancity-box-header">
          <div className="badge">Manchester City</div>
          <h1>Tạo tài khoản</h1>
          <p>Đăng ký tài khoản fan mới</p>
        </div>

        <form onSubmit={handleSignup} className="mancity-form">
          {/* INPUTS */}
          <div className="form-group">👤 
            <label htmlFor="username">Tên đăng nhập</label>
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

          <div className="form-group">
            <label htmlFor="fullName">📝 Họ và tên</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nhập họ và tên"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">📧 Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
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
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">🔒 Xác nhận mật khẩu</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">☎️ Số điện thoại</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">📍 Địa chỉ</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ"
              disabled={loading}
              required
            />
          </div>

          {/* ERROR / SUCCESS */}
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button
            type="submit"
            className="mancity-button primary"
            disabled={loading}
          >
            {loading ? '⏳ Đang tạo tài khoản...' : '✓ Đăng Ký'}
          </button>
        </form>

        <div className="mancity-links">
          <span>Đã có tài khoản?</span>
          <span>•</span>
          <Link to="/login">Đăng Nhập</Link>
        </div>
      </div>
    </div>
  );
}