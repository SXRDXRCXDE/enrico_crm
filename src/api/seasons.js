import axios from "axios";

export const getSeasons = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get("/api/v1/seasons/", {
            params: {
                page: page,   // Current page number
                limit: limit, // Items per page
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching seasons:", error);
        throw error;
    }
};


export const getSeasonById = async (id) => {
    try {
        const response = await axios.get(`/api/v1/seasons/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching season with ID ${id}:`, error);
        throw error;
    }
};

export const createSeason = async (seasonData) => {
    try {
        const response = await axios.post("/api/v1/seasons/", seasonData);
        return response.data;
    } catch (error) {
        console.error("Error creating season:", error);
        throw error;
    }
};

export const updateSeason = async (id, seasonData) => {
    try {
        const response = await axios.put(`/api/v1/seasons/${id}`, seasonData);
        return response.data;
    } catch (error) {
        console.error("Error updating season:", error);
        throw error;
    }
};

export const deleteSeason = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/seasons/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting season:", error);
        throw error;
    }
};