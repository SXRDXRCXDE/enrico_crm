import axios from "axios";

export const getColors = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get("/api/v1/colors/", {
            params: {
                page: page,   // Page number
                limit: limit, // Number of items per page
            },
        });
        return response.data; // Returning the data from the API
    } catch (error) {
        console.error("Error fetching colors:", error);
        throw error; // Throw error for handling in calling function
    }
};

export const createColor = async (colorData) => {
    try {
        const response = await axios.post("/api/v1/colors/", colorData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data; // Return the created color data
    } catch (error) {
        console.error("Error creating color:", error);
        throw error; // Throw error for handling in calling function
    }
};

export const getColorById = async (id) => {
    try {
        const response = await axios.get(`/api/v1/colors/${id}`);
        return response.data; // Return the specific color data
    } catch (error) {
        console.error("Error fetching color by ID:", error);
        throw error; // Throw error for handling in calling function
    }
};

export const updateColor = async (id, colorData) => {
    try {
        const response = await axios.put(`/api/v1/colors/${id}`, colorData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data; // Return the updated color data
    } catch (error) {
        console.error("Error updating color:", error);
        throw error; // Throw error for handling in calling function
    }
};

export const deleteColor = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/colors/${id}`);
        return response.data; // Return the response after deletion
    } catch (error) {
        console.error("Error deleting color:", error);
        throw error; // Throw error for handling in calling function
    }
};