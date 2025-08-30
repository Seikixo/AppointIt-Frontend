import type { Credentials } from "@/types/types";
import axiosInstance from "./axios";

export const loginUser = async (data: Credentials) => {
  try {
    const response = await axiosInstance.post("/login", data);
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    return { success: false, message };
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    localStorage.removeItem("token");
    return response.data;
  } catch (error: any) {
    const message = error.response;
    return { success: false, message: message };
  }
};

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
}) => axiosInstance.post("/register", data);

export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data.users;
  } catch (error: any) {
    const message = error.response;
    return { success: false, message: message };
  }
};
