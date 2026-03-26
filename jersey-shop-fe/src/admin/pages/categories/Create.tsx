import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/categories/Create.css";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Tên danh mục không được để trống");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      await axios.post(
        "http://localhost:8080/api/v1/categories",
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Thêm danh mục thành công");

      navigate("/admin/categories"); // quay lại list
    }  catch (err: any) {
    if (err.response?.status === 400) {
      alert(err.response.data.message || "Tên danh mục đã tồn tại (bao gồm thùng rác)");
    } else {
      alert("Lỗi server!");
    }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>➕ Thêm danh mục</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Tên danh mục</label>
          <input
            type="text"
            placeholder="Nhập tên danh mục..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

     

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </button>

          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/admin/categories")}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;