import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Link,
  Outlet
} from 'react-router-dom';

import { LoginPage } from './user/pages/LoginPage';
import { UserSignupPage } from './user/pages/UserSignupPage';
import { AdminLoginPage } from './admin/pages/AdminLoginPage';
import { UserDashboard } from './user/pages/UserDashboard';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminLayout } from './admin/pages/AdminLayout';
import { ListUser } from './admin/pages/user/ListUser';
import { UserDetail } from './admin/pages/user/UserDetail';
import manCityLogo from './img/ManCity.png';
import './App.css';
import { authService } from './services/authService';

import ListCategories from './admin/pages/categories/List';
import CreateCategory from './admin/pages/categories/Create';
import UpdateCategory from './admin/pages/categories/Update';
import CategoryDetail from './admin/pages/categories/Detail';
import CategoryTrash from './admin/pages/categories/Trash';
/* =======================
   🔐 Protected Route (Admin)
======================= */
function AdminRoute({ children }: { children: JSX.Element }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!authService.isAdmin()) {
    return <Navigate to="/403" replace />;
  }

  return children;
}

/* =======================
   🚫 Forbidden Page
======================= */
function ForbiddenPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>403 - Forbidden</h1>
      <p>Bạn không có quyền truy cập trang này</p>
    </div>
  );
}

/* =======================
   🧭 App Router
======================= */
function App() {
  const navigate = useNavigate();
  const location = useLocation();

 const handleLogout = () => {
  const isAdmin = authService.isAdmin(); // lưu role trước khi logout

  authService.logout();

  if (isAdmin) {
    navigate('/admin/login', { replace: true });
  } else {
    navigate('/login', { replace: true });
  }
};

  /* 🔥 Ẩn header ở các trang login */
  const hideHeaderRoutes = ['/login', '/signup', '/admin/login'];

  const shouldHideHeader = hideHeaderRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {/* HEADER */}
      {!shouldHideHeader && (
        <header className="mancity-header">
          <Link to="/" className="mancity-logo">
            <img src={manCityLogo} alt="Manchester City" />
            <span className="mancity-logo-text">
              Manchester City football kits
            </span>
          </Link>

          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              borderRadius: '8px',
              color: 'white',
              backgroundColor: 'var(--mc-primary)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Đăng xuất
          </button>
        </header>
      )}

      {/* ROUTES */}
      <Routes>
        {/* USER */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ListUser />} />
          <Route path="users/:id" element={<UserDetail />} />

          //*  categories * /
          <Route path="categories" element={<ListCategories />} />
          <Route path="categories/create" element={<CreateCategory />} />
          <Route path="categories/edit/:id" element={<UpdateCategory />} />
          <Route path="categories/detail/:id" element={<CategoryDetail />} />
          <Route path="categories/trash" element={<CategoryTrash />} />
        </Route>
{/* <Route path="categories" element={<Outlet />}>
  <Route index element={<ListCategories />} />
  <Route path="create" element={<CreateCategory />} />
  <Route path="edit/:id" element={<UpdateCategory />} />
  <Route path="detail/:id" element={<CategoryDetail />} />
  <Route path="trash" element={<CategoryTrash />} />
</Route> */}
        {/* FORBIDDEN */}
        <Route path="/403" element={<ForbiddenPage />} />

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;