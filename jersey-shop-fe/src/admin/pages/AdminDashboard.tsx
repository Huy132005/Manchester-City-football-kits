// src/pages/admin/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    if (!authService.isAdmin()) {
      navigate('/403');
      return;
    }

    // Dữ liệu giả lập - sau này thay bằng API thật
    const fakeStats = [
      { month: 'Jan', users: 120, orders: 45 },
      { month: 'Feb', users: 200, orders: 60 },
      { month: 'Mar', users: 150, orders: 80 },
      { month: 'Apr', users: 250, orders: 120 },
      { month: 'May', users: 300, orders: 160 },
    ];
    setStats(fakeStats);
    setLoading(false);
  }, [navigate]);

  if (loading) return <div className="dashboard-loading">Đang tải dữ liệu...</div>;

  const totalUsers = stats.reduce((acc, cur) => acc + cur.users, 0);
  const totalOrders = stats.reduce((acc, cur) => acc + cur.orders, 0);

  // Chỉ giữ lại phần return, logic useEffect giữ nguyên
return (
  <div className="dashboard-container">
    {/* ===== STATS ===== */}
    <div className="stats-grid">
      <div className="stat-card">
        <span>TỔNG NGƯỜI DÙNG</span>
        <h2>{totalUsers.toLocaleString()}</h2>
      </div>

      <div className="stat-card">
        <span>TỔNG ĐƠN HÀNG</span>
        <h2>{totalOrders.toLocaleString()}</h2>
      </div>

      <div className="stat-card">
        <span>DOANH THU</span>
        <h2>$15,400</h2>
      </div>
    </div>

    {/* ===== CHARTS ===== */}
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Tăng trưởng User</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#6cabdd" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Thống kê Đơn hàng</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#1c2c5b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
}