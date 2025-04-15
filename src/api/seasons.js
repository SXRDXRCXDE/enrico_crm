import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.enrico.uz/api/v1/seasons",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getSeasons = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get("/", {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching seasons:", error.response?.data || error.message);
        throw error;
    }
};

export const getSeasonById = async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching season with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export const createSeason = async (seasonData) => {
    try {
        const response = await axiosInstance.post("/", seasonData);
        return response.data;
    } catch (error) {
        console.error("Error creating season:", error.response?.data || error.message);
        throw error;
    }
};

export const updateSeason = async (id, seasonData) => {
    try {
        const response = await axiosInstance.put(`/${id}`, seasonData);
        return response.data;
    } catch (error) {
        console.error("Error updating season:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteSeason = async (id) => {
    try {
        const response = await axiosInstance.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting season:", error.response?.data || error.message);
        throw error;
    }
};
