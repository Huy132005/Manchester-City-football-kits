import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import '../styles/dashboard/Dashboard.css';

export function AdminDashboard() {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [stats, setStats] = useState<any[]>([]);

  // 🔥 check quyền khi vào trang
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    if (!authService.isAdmin()) {
      navigate('/login'); // hoặc trang 403
    }

    // 🔹 Fake stats
    setStats([
      { month: 'Jan', users: 120, orders: 45 },
      { month: 'Feb', users: 200, orders: 60 },
      { month: 'Mar', users: 150, orders: 80 },
      { month: 'Apr', users: 250, orders: 120 },
      { month: 'May', users: 300, orders: 160 },
    ]);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <div className="mancity-dashboard">
      <aside className="sidebar">
        <h2>ManCity Admin</h2>
        <ul>
          <li>🏠 Dashboard</li>
          <li>👥 Users</li>
          <li>🛒 Orders</li>
          <li>⚙️ Settings</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>⚙️ Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">
            ✓ Đăng Xuất
          </button>
        </header>

        <section className="dashboard-widgets">
          <div className="widget">
            <h3>Tổng người dùng</h3>
            <p>{stats.reduce((acc, cur) => acc + cur.users, 0)}</p>
          </div>
          <div className="widget">
            <h3>Tổng đơn hàng</h3>
            <p>{stats.reduce((acc, cur) => acc + cur.orders, 0)}</p>
          </div>
        </section>

        <section className="dashboard-charts">
          <div className="chart-container">
            <h3>Người dùng theo tháng</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#3399cc" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Đơn hàng theo tháng</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#6cabdd" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}