export interface AuthResponse {
  auth: {
    accessToken: string;
    refreshToken: string;
    timeToLive: number;
  };
  user: {
    token: string;
    type: string;
    username: string;
    email: string;
    roles: string[];
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  full_name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  address: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthResponse['user'] | null;
  tokens: AuthResponse['auth'] | null;
  loading: boolean;
  error: string | null;
}
