import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.enrico.uz/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getSizes = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get("/sizes/", {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching sizes:", error.response?.data || error.message);
        throw error;
    }
};

export const postSize = async (sizeData) => {
    try {
        const response = await axiosInstance.post("/sizes/", sizeData);
        return response.data;
    } catch (error) {
        console.error("Error creating size:", error.response?.data || error.message);
        throw error;
    }
};

export const getSizeById = async (id) => {
    try {
        const response = await axiosInstance.get(`/sizes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching size by ID:", error.response?.data || error.message);
        throw error;
    }
};

export const updateSize = async (id, sizeData) => {
    try {
        const response = await axiosInstance.put(`/sizes/${id}`, sizeData);
        return response.data;
    } catch (error) {
        console.error("Error updating size:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteSize = async (id) => {
    try {
        const response = await axiosInstance.delete(`/sizes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting size:", error.response?.data || error.message);
        throw error;
    }
};