// src/api/usersApi.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.enrico.uz/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getUsers = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get("/users/", {
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
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/users/", userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error.response?.data || error.message);
        throw error;
    }
};

export const updateUser = async (userId, updatedData) => {
    try {
        const response = await axiosInstance.put(`/users/${userId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error.response?.data || error.message);
        throw error;
    }
};
