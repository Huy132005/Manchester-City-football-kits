import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../styles/dashboard/Dashboard.css';

export function UserDashboard() {
  const navigate = useNavigate();
  const user = authService.getUser();

  const [activeTab, setActiveTab] = useState('dashboard'); // 👈 tab hiện tại

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (authService.isAdmin()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">MC Shop</h2>

        <ul>
          <li
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            🏠 Dashboard
          </li>

          <li
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            👤 Hồ sơ
          </li>

          <li>🛒 Sản phẩm</li>
          <li>📦 Đơn hàng</li>
          <li>❤️ Yêu thích</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* TOPBAR */}
        <div className="topbar">
          <h2>
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'profile' && 'Thông tin cá nhân'}
          </h2>
        </div>

        {/* CONTENT */}
        <div className="content">

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              <div className="cards">
                <div className="card">
                  <h3>Đơn hàng</h3>
                  <p>12</p>
                </div>
                <div className="card">
                  <h3>Yêu thích</h3>
                  <p>5</p>
                </div>
                <div className="card">
                  <h3>Thông báo</h3>
                  <p>3</p>
                </div>
              </div>
            </>
          )}

          {/* PROFILE */}
         {activeTab === 'profile' && (
  <div className="profile-card-v2">

    {/* HEADER */}
    <div className="profile-header">
      <div className="avatar-large">
        {user?.username?.charAt(0).toUpperCase()}
      </div>

      <div>
        <h2>{user?.username}</h2>
        {/* <p className="email">{user?.email}</p> */}

        <div className="role-badge">
          {user?.roles?.join(', ')}
        </div>
      </div>
    </div>

    {/* INFO GRID */}
    <div className="profile-info">
      <div className="info-item">
        <span>Username</span>
        <strong>{user?.username}</strong>
      </div>

      {/* <div className="info-item">
        <span>Email</span>
        <strong>{user?.email}</strong>
      </div> */}

      <div className="info-item">
        <span>Vai trò</span>
        <strong>{user?.roles?.join(', ')}</strong>
      </div>

      <div className="info-item">
        <span>Trạng thái</span>
        <strong className="status active">Active</strong>
      </div>
    </div>

    {/* ACTION */}
    <div className="profile-actions">
      <button className="btn-edit">✏️ Chỉnh sửa</button>
      <button className="btn-password">🔒 Đổi mật khẩu</button>
    </div>

  </div>
)}

        </div>
      </div>
    </div>
  );
}