import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../styles/dashboard/Dashboard.css';

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login', { replace: true });
  };

  // Hàm để check active link
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <div className="mancity-dashboard">
      <aside className="sidebar">
        <div className="logo">MCFC ADMIN</div>
        <ul className="menu">
          <li>
            <Link  to="/admin/dashboard" className={`menu-link ${isActive('/admin/dashboard')}`}>
              🏠 <span>Trang chủ</span>
            </Link>
          </li>
            <li>
            <Link to="/admin/categories" className={`menu-link ${isActive('/admin/categories')}`}>
              👕 <span>Danh mục</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className={`menu-link ${isActive('/admin/orders')}`}>
              🛒 <span>Đặt hàng</span>
            </Link>
          </li>
            <li>
            <Link to="/admin/users" className={`menu-link ${isActive('/admin/users')}`}>
              👥 <span>Khách hàng</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" className={`menu-link ${isActive('/admin/settings')}`}>
              ⚙️<span>Settings</span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="dashboard-main">
       

        {/* Bọc nội dung page vào đây để có padding đẹp */}
        <div className="admin-page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}