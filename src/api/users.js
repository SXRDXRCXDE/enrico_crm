import axios from "axios";

export const getUsers = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`/api/v1/users/`, {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`/api/v1/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};


export const createUser = async (userData) => {
    try {
        const response = await axios.post("/api/v1/users/", userData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error.response?.data || error.message);
        throw error;
    }
};

export const updateUser = async (userId, updatedData) => {
    try {
        const response = await axios.put(`/api/v1/users/${userId}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error.response?.data || error.message);
        throw error;
    }
};