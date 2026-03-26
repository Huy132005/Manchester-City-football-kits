import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/categories/Update.css'; // Dùng chung style với trang List

export const UpdateCategory  = () => {
  const { id } = useParams(); // Lấy ID từ URL: /admin/categories/edit/:id
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Lấy dữ liệu cũ của danh mục khi vừa vào trang
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`http://localhost:8080/api/v1/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setName(res.data.name);
      } catch (err) {
        setError("Không thể tìm thấy danh mục này.");
        console.error(err);
      }
    };
    fetchCategory();
  }, [id]);

  // 2. Xử lý khi nhấn Lưu
 const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name.trim()) {
    return alert("Tên danh mục không được để trống!");
  }

  try {
    setLoading(true);
    const token = localStorage.getItem("accessToken");

    // PUT để cập nhật toàn bộ object
    await axios.put(
      `http://localhost:8080/api/v1/categories/${id}`,
      { name: name },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Cập nhật thành công!");
    navigate("/admin/categories"); // Quay lại trang danh sách
  } catch (err: any) {
    if (err.response?.status === 400) {
      alert(err.response.data.message || "Tên danh mục đã tồn tại (bao gồm thùng rác)");
    } else {
      alert("Lỗi server!");
    }
  } finally {
    setLoading(false); // ✅ finally phải đứng **ngoài catch**
  }
};

return (
  <div className="admin-container">
    <div className="admin-header">
      <div>
        <h1 className="admin-title">Chỉnh sửa danh mục</h1>
        <p className="admin-subtitle">Cập nhật thông tin phân loại sản phẩm</p>
      </div>
    </div>

    <div className="form-container">
      {error ? (
        <div className="status-message error">{error}</div>
      ) : (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Tên danh mục</label>
            <input
              id="name"
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Áo đấu sân nhà, Phụ kiện..."
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-submit" 
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={() => navigate("/admin/categories")}
            >
              Hủy bỏ
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
);
};
export default UpdateCategory;