import axios from "axios";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: "https://api.enrico.uz/api/v1/brands",
});

// Get paginated list of brands
export const getBrands = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get("/", {
            params: {
                page,
                limit,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching brands:", error);
        throw error;
    }
};

// Get brand by ID
export const getBrandById = async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching brand with ID ${id}:`, error);
        throw error;
    }
};

// Create a new brand
export const createBrand = async (brandData) => {
    try {
        const response = await axiosInstance.post("/", brandData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating brand:", error);
        throw error;
    }
};

// Update an existing brand
export const updateBrand = async (id, brandData) => {
    try {
        const response = await axiosInstance.put(`/${id}`, brandData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating brand with ID ${id}:`, error);
        throw error;
    }
};

// Delete a brand
export const deleteBrand = async (id) => {
    try {
        const response = await axiosInstance.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting brand with ID ${id}:`, error);
        throw error;
    }
};
