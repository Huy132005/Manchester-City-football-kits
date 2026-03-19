import axios from 'axios';
import { LoginRequest, AuthResponse, SignupRequest } from '../types/auth';

const API_BASE_URL = `http://localhost:8080/api/v1/auth`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔥 interceptor tự gắn token vào mọi request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // ✅ CHỈ 1 API LOGIN DUY NHẤT
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/login', credentials);

      if (response.data) {
        // lưu token
        localStorage.setItem('accessToken', response.data.auth.accessToken);
        localStorage.setItem('refreshToken', response.data.auth.refreshToken);

        // lưu user
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  // Get stored token
  getAccessToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  // Get stored user
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Lấy role (🔥 thêm cực hữu ích)
  getRoles: (): string[] => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).roles || [] : [];
  },

  // Check login
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },

  // Check role admin (🔥 dùng cho route)
  isAdmin: (): boolean => {
    const roles = authService.getRoles();
    return roles.includes('ADMIN');
  },

  // ✅ SIGNUP
  signup: async (data: SignupRequest): Promise<any> => {
    try {
      const payload = {
        username: data.username,
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
      };
      console.log('Sending signup payload:', payload);
      const response = await axiosInstance.post<any>('/register', payload);

      // ✅ Nếu backend trả auth token (auto login)
      if (response.data?.auth?.accessToken) {
        localStorage.setItem('accessToken', response.data.auth.accessToken);
        localStorage.setItem('refreshToken', response.data.auth.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      // ✅ Trả về response cho component xử lý
      return response.data;
    } catch (error: any) {
      // 🔥 Nếu backend trả 400/409 nhưng message "Registered successfully" = thành công
      if (error.response?.status === 400 || error.response?.status === 409) {
        const message = error.response?.data?.message || '';
        if (message.toLowerCase().includes('registered') || message.toLowerCase().includes('successfully')) {
          console.log('✅ Signup thành công (backend trả 400 nhưng message success)');
          return { success: true, message, username: error.response?.data?.username };
        }
      }
      throw error;
    }
  },
};