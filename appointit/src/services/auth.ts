import axiosInstance from "./axios";

export const loginUser = async (data: {
    email: string;
    password: string;
}) => {
    try 
    {
        const response = await axiosInstance.post("/login", data)
        const token = response.data.access_token;
        localStorage.setItem("access_token", token);

        return { success: true, data: response.data };
    }
    catch(error: any)
    {   
        const message =
        error.response?.data?.message || "Login failed. Please try again.";
        return { success: false, message };        
    }

}

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;    
}) => axiosInstance.post('/register', data);

export const logoutUser = async () => {
    const response = axiosInstance.post('/logout');
    localStorage.removeItem("access_token");

    return response;
};

export const getUser = () => axiosInstance.get('/user');