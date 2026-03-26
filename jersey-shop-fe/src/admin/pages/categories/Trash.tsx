import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../../styles/categories/Trash.css';
const CategoryTrash = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const fetchTrash = async () => {
    const token = localStorage.getItem("accessToken");

    const res = await axios.get(
      "http://localhost:8080/api/v1/categories/trash",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCategories(res.data);
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (id) => {
    const token = localStorage.getItem("accessToken");

    await axios.put(
      `http://localhost:8080/api/v1/categories/restore/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchTrash();
  };
// Xóa vĩnh viễn
// Xóa vĩnh viễn
const handleHardDelete = async (id: number) => {
  if (!window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn danh mục này?")) return;

  try {
    const token = localStorage.getItem("accessToken");

    await axios.delete(`http://localhost:8080/api/v1/categories/hard/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Đã xóa vĩnh viễn");
    fetchTrash(); // <-- sửa ở đây, dùng fetchTrash của Trash.tsx
  } catch (err) {
    console.error(err);
    alert("Xóa vĩnh viễn thất bại!");
  }
};
return (
  <div className="container">
    <div className="header">
      <h2>🗑️ Thùng rác danh mục</h2>
      <button
        className="btn btn-back"
        onClick={() => navigate("/admin/categories")}
      >
        ← Quay lại
      </button>
    </div>

    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>   
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            categories.map((c, i) => (
              <tr key={c.id}>
                <td>{i + 1}</td>
                <td className="name">{c.name}</td>
                
                <td>
                  <button
                    className="btn btn-restore ml-2"
                    onClick={() => handleRestore(c.id)}
                  >
                    🔄 Khôi phục
                  </button>
                  <button 
                    className="btn btn-delete ml-2"
                    onClick={() => handleHardDelete(c.id)}
                  >
                    ✘ Xóa vĩnh viễn
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default CategoryTrash;