import type { Organization } from "@/types/types";
import axiosInstance from "./axios";

export const createOrganizationApi = async (data: Organization) => {
  try {
    const response = await axiosInstance.post("/organizations", data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    return { success: false, message };
  }
};
