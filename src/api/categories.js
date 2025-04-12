import axios from "axios";

export const getCategories = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get("/api/v1/categories/", {
            params: {
                page: page,   // Current page number
                limit: limit, // Items per page
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};


export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`/api/v1/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw error;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await axios.post("/api/v1/categories/", categoryData);
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

export const updateCategory = async (id, categoryData) => {
    try {
        const response = await axios.put(`/api/v1/categories/${id}`, categoryData);
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};