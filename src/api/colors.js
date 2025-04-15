import axios from "axios";

// Axios instance for colors API
const axiosInstance = axios.create({
    baseURL: "https://api.enrico.uz/api/v1/colors",
});

// Get paginated colors
export const getColors = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get("/", {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching colors:", error);
        throw error;
    }
};

// Create a new color
export const createColor = async (colorData) => {
    try {
        const response = await axiosInstance.post("/", colorData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating color:", error);
        throw error;
    }
};

// Get color by ID
export const getColorById = async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching color by ID:", error);
        throw error;
    }
};

// Update color by ID
export const updateColor = async (id, colorData) => {
    try {
        const response = await axiosInstance.put(`/${id}`, colorData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating color:", error);
        throw error;
    }
};

// Delete color by ID
export const deleteColor = async (id) => {
    try {
        const response = await axiosInstance.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting color:", error);
        throw error;
    }
};
