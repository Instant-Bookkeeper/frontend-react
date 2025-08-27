import { axiosInstance } from "@/lib/axios-instance";

// ====================== Types ======================

export type LoginPayload = {
  email: string;
  password: string;
};

export type RefreshTokenPayload = {
  refreshToken: string;
};

export type CreateUserPayload = {
  email: string;
  name: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
};

export type MessageInfo = {
  messageCode: string;
  description: string;
  createdId?: number;
};

// ====================== API Calls ======================

// User Login
export const login = (payload: LoginPayload): Promise<LoginResponse> =>
  axiosInstance.post(`/auth/login`, payload);

// Refresh Token
export const refreshToken = (
  payload: RefreshTokenPayload
): Promise<LoginResponse> => axiosInstance.post(`/auth/refresh`, payload);

// Logout
export const logout = (): Promise<MessageInfo> =>
  axiosInstance.post(`/auth/logout`);

// Register User
export const register = (payload: CreateUserPayload): Promise<MessageInfo> =>
  axiosInstance.post(`/auth/register`, payload);
