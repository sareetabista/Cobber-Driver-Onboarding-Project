import axiosInstance from "../instance";

export interface AuthPayload {
  email: string;
  password: string;
}

export const login = async (payload: AuthPayload) => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response;
};

export const register = async (payload: AuthPayload) => {
  const response = await axiosInstance.post("/auth/register", payload);
  return response;
};
