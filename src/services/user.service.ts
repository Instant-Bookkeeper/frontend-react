import { axiosInstance } from "@/lib/axios-instance";

// ====================== Types ======================

type UserProfile = {
  name: string;
  email: string;
  role: string;
};

// ====================== API Calls ======================

export const userProfile = (): Promise<UserProfile> =>
  axiosInstance.get(`/users/profile`);
