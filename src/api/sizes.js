import axios from "axios";

export const getSizes = async () => {
    try {
        const response = await axios.get("/api/v1/sizes/");
        return response.data;
    } catch (error) {
        console.error("Error fetching sizes:", error.response?.data || error);
        throw error;
    }
};

export const postSize = async (sizeData) => {
    try {
        const response = await axios.post("/api/v1/sizes/", sizeData);
        return response.data;
    } catch (error) {
        console.error("Error creating size:", error.response?.data || error);
        throw error;
    }
};

export const getSizeById = async (id) => {
    try {
        const response = await axios.get(`/api/v1/sizes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching size:", error.response?.data || error);
        throw error;
    }
};

export const updateSize = async (id, sizeData) => {
    try {
        const response = await axios.put(`/api/v1/sizes/${id}`, sizeData);
        return response.data;
    } catch (error) {
        console.error("Error updating size:", error.response?.data || error);
        throw error;
    }
};

export const deleteSize = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/sizes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting size:", error.response?.data || error);
        throw error;
    }
};