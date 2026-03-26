import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import '../../styles/user/UserDetail.css';

export function UserDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = Number(id);
                const data = await authService.getUserById(userId);
                setUser(data);
            } catch (err) {
                navigate('/admin/users');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, navigate]);

    if (loading) return <div className="loading-spinner">Đang tải hồ sơ...</div>;

    return (
        <div className="user-detail-wrapper">
            <div className="detail-header">
                <button onClick={() => navigate('/admin/users')} className="back-link">
                    ← Quay lại danh sách
                </button>
                <h2 className="page-title">Hồ sơ người dùng {user.full_name}</h2>
            </div>

            <div className="profile-grid">
                {/* Cột trái: Ảnh đại diện & Thông tin chính */}
                <div className="profile-sidebar-card">
                    <div className="avatar-circle">
                        {user.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <h3>{user.full_name}</h3>
                    <span className={`status-pill ${user.status?.toLowerCase()}`}>
                        {user.status === 'ACTIVE' ? '● Đang hoạt động' : '○ Bị khóa'}
                    </span>
                    <div className="role-tag">
                        Quyền: {user.roles?.map((r: any) => r.name).join(', ')}
                    </div>
                </div>

                {/* Cột phải: Chi tiết liên hệ */}
                <div className="profile-main-card info-section">
                    <div className="info-group">
                        <label>Tên đăng nhập</label>
                        <p>{user.username}</p>
                    </div>
                    <div className="info-group">
                        <label>Email liên hệ</label>
                        <p>{user.email}</p>
                    </div>
                    <div className="info-group">
                        <label>Số điện thoại</label>
                        <p>{user.phone || 'Chưa cập nhật'}</p>
                    </div>
                    <div className="info-group">
                        <label>Địa chỉ thường trú</label>
                        <p>{user.address || 'Chưa cập nhật'}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}