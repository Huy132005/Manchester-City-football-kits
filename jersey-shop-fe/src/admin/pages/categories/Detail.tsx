import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/categories/Detail.css';

export default function CategoryDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`http://localhost:8080/api/v1/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategory(res.data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="admin-container">Đang tải dữ liệu...</div>;
  if (!category) return <div className="admin-container">Không tìm thấy danh mục!</div>;

  return (
    <div className="admin-container">
      <div className="detail-header-section">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Quay lại danh sách
        </button>
        <h1 className="admin-title">Chi tiết danh mục</h1>
      </div>

      <div className="detail-card">
        <div className="detail-info-group">
          <label>ID Danh mục:</label>
          <span>{category.id}</span>
        </div>

        <div className="detail-info-group">
          <label>Tên danh mục:</label>
          <span className="highlight-name">{category.name}</span>
        </div>

      

    

        <hr className="divider" />

        <div className="detail-actions">
          <button 
            className="btn-edit-detail" 
            onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
          >
            Chỉnh sửa thông tin
          </button>
        </div>
      </div>
    </div>
  );
}