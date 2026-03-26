import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/categories/List.css';

export default function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const navigate = useNavigate();

  const fetchCategories = async (page = 0) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      // Lưu ý: API này thường chỉ trả về các bản ghi CHƯA xóa (deleted = false)
      const res = await axios.get(`http://localhost:8080/api/v1/categories?page=${page}&size=${pageSize}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data.content || res.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Lỗi tải dữ liệu", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  // --- Điều hướng ---
  const goToCreate = () => navigate("/admin/categories/create");
  const goToTrash = () => navigate("/admin/categories/trash"); // Trang khôi phục
  const goToEdit = (id) => navigate(`/admin/categories/edit/${id}`);
  const goToDetail = (id) => navigate(`/admin/categories/detail/${id}`);

  const handleSoftDelete = async (id) => {
  if (!window.confirm("Đưa danh mục này vào thùng rác?")) return;

  try {
    const token = localStorage.getItem("accessToken");

    await axios.delete(`http://localhost:8080/api/v1/categories/soft/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Đã chuyển vào thùng rác");
    fetchCategories(currentPage);
  } catch (err) {
    console.error(err);
    alert("Xóa mềm thất bại!");
  }
};

  const handleHardDelete = async (id) => {
    if (!window.confirm("CẢNH BÁO: Hành động này không thể hoàn tác!")) return;
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8080/api/v1/categories/hard/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories(currentPage);
    } catch (err) { alert("Xóa vĩnh viễn thất bại (Lỗi 500 - Kiểm tra khóa ngoại tại DB)!"); }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Quản lý danh mục</h1>
          <p className="admin-subtitle">Danh sách các danh mục đang hoạt động</p>
        </div>
        
        {/* Nhóm nút hành động trên Header */}
        <div className="header-actions">
          <button className="btn btn-trash" onClick={goToTrash}>
            <span className="icon">🗑</span> Thùng rác
          </button>
          <button className="btn btn-add" onClick={goToCreate}>
            + Thêm mới
          </button>
        </div>
      </div>

      <div className="table-card">
        {/* Giữ nguyên phần Table như cũ của bạn */}
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên danh mục</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat.id}>
                  <td className="text-center">{currentPage * pageSize + index + 1}</td>
                  <td className="category-name-cell" onClick={() => goToDetail(cat.id)}>
                    {cat.name}
                  </td>
                  <td>
                    <div className="action-group">
                      <button className="btn-icon view" onClick={() => goToDetail(cat.id)}>👁</button>
                      <button className="btn-icon edit" onClick={() => goToEdit(cat.id)}>✎</button>
                      <button className="btn-icon soft" onClick={() => handleSoftDelete(cat.id)}>🗑</button>
                      <button className="btn-icon hard" onClick={() => handleHardDelete(cat.id)}>✘</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className="empty-cell">Trống</td></tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination giữ nguyên */}
        <div className="pagination-wrapper">
            <button className="pagi-btn" disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)}>&laquo; Trước</button>
            <div className="page-info">Trang {currentPage + 1} / {totalPages}</div>
            <button className="pagi-btn" disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(p => p + 1)}>Sau &raquo;</button>
        </div>
      </div>
    </div>
  );
}