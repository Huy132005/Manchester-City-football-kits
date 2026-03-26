import { useEffect, useState } from 'react';
import { authService } from '../../../services/authService';
import '../../styles/user/User.css';// Tạo file CSS tương ứng

export function ListUser() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await authService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId: number, currentStatus: string) => {
    if (window.confirm(`Bạn có chắc muốn đổi trạng thái user này sang ${currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'}?`)) {
      try {
        await authService.toggleUserStatus(userId, currentStatus);
        // Load lại danh sách sau khi update thành công
        fetchUsers();
      } catch (err) {
        alert("Không thể cập nhật trạng thái!");
      }
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="user-management-container ">
      <h2>Quản lý người dùng</h2>
      <table className="user-table">
        <thead >
          <tr>
            <th>ID</th>
            <th>Họ Tên</th>
            <th>Username</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.roles?.map((r: any) => r.name).join(', ')}</td>
              <td>
                <span className={`status-badge ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <div className="action-group">
                  <button
                    onClick={() => handleToggleStatus(user.id, user.status)}
                    className={`toggle-btn ${user.status === 'ACTIVE' ? 'btn-danger' : 'btn-success'}`}
                  >
                    {user.status === 'ACTIVE' ? 'Khóa' : 'Kích hoạt'}
                  </button>

                  <button
                    onClick={() => window.location.href = `/admin/users/${user.id}`}
                    className="view-btn"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}