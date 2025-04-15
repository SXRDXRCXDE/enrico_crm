import axios from "axios";

// Set the base URL for all axios requests
const axiosInstance = axios.create({
    baseURL: "https://api.enrico.uz/api/v1/auth",
});

// Login API
export const loginUser = async (username, password) => {
    try {
        const response = await axiosInstance.post("/login", {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

// Register API
export const registerUser = async (username, password) => {
    try {
        const response = await axiosInstance.post("/register", {
            username,
            password,
            role: "user",
        });
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};
