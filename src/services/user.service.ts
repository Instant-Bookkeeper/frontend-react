import { axiosInstance } from "@/lib/axios-instance";

// ====================== Types ======================

export type UserProfile = {
  name: string;
  email: string;
  role: string;
};

// ====================== API Calls ======================

export const getUserProfile = (): Promise<UserProfile> =>
  axiosInstance.get(`/users/profile`);
