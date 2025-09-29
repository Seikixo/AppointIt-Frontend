import type { CreateUser, Credentials } from "@/types/types";
import axiosInstance from "./axios";

export const loginUser = async (data: Credentials) => {
  try {
    const response = await axiosInstance.post("/login", data);
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    const errors = error.response?.data?.errors || {};
    throw { message, errors };
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    localStorage.removeItem("token");
    return response.data;
  } catch (error: any) {
    const message = error.response;
    throw new Error(message);
  }
};

export const registerUser = async (data: CreateUser) => {
  try {
    const response = await axiosInstance.post("/register", data);
    return response;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Registration failed. Please try again.";
    const errors = error.response?.data?.errors || {};
    throw { message, errors };
  }
};

export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data.users;
  } catch (error: any) {
    const message = error.response;
    throw new Error(message);
  }
};
