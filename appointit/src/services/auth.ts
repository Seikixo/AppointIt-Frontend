import type { Credentials } from "@/types/types";
import axiosInstance from "./axios";

export const loginUser = async (data: Credentials) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    return { success: false, message };
  }
};

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
}) => axiosInstance.post("/register", data);

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    return response.data;
  } catch (error: any) {
    const message = error.response;
    return { success: false, message: message };
  }
};

export const getUser = () => axiosInstance.get("/user");
