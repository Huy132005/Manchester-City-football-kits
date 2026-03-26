import axios from 'axios';
import { LoginRequest, SignupRequest } from '../types/auth';

const API_BASE_URL = 'http://localhost:8080/api/v1/auth';
const USER_API = 'http://localhost:8080/api/v1/users';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor gắn token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token && !config.url?.includes('/login') && !config.url?.includes('/register')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authService = {
  // 1. Login
login: async (credentials: LoginRequest): Promise<any> => {
  const response = await axiosInstance.post('/login', credentials);

  console.log("LOGIN RESPONSE:", response.data); // 👈 debug

  if (response.data) {
    const accessToken = response.data.auth?.accessToken;

    console.log("TOKEN:", accessToken); // 👈 debug token

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response.data;
},
  // 2. Signup
  signup: async (userData: SignupRequest): Promise<any> => {
    const response = await axiosInstance.post('/register', userData);
    return response.data;
  },

  // 3. Logout
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
  },

  // 4. Get user
  getUser: () => {
    const userData = localStorage.getItem('user');
    try {
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },

  // 5. Check admin
  isAdmin: () => {
    const user = authService.getUser();
    if (!user || !user.roles || !Array.isArray(user.roles)) return false;
    return user.roles.includes('ROLE_ADMIN');
  },

  // 6. Auth check
  isAuthenticated: () => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  },

  // 7. Lấy danh sách user
  getAllUsers: async (): Promise<any[]> => {
    const response = await axiosInstance.get(`${USER_API}`);
    return response.data;
  },

  // 8. Toggle trạng thái user
  toggleUserStatus: async (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

    const response = await axiosInstance.put(
      `${USER_API}/${userId}/status`,
      { status: newStatus }
    );

    return response.data;
  },
  getUserById: async (id: number) => {
  const token = localStorage.getItem('accessToken');

  const response = await axios.get(`${USER_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
},
};