import axios from "axios";

// Create an Axios instance with base URL for categories
const axiosInstance = axios.create({
    baseURL: "https://api.enrico.uz/api/v1/categories",
});

// Get paginated list of categories
export const getCategories = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get("/", {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// Get category by ID
export const getCategoryById = async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw error;
    }
};

// Create a new category
export const createCategory = async (categoryData) => {
    try {
        const response = await axiosInstance.post("/", categoryData);
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

// Update an existing category
export const updateCategory = async (id, categoryData) => {
    try {
        const response = await axiosInstance.put(`/${id}`, categoryData);
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

// Delete a category
export const deleteCategory = async (id) => {
    try {
        const response = await axiosInstance.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};
