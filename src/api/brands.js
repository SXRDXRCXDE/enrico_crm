import axios from "axios";

export const getBrands = async () => {
    try {
        const response = await axios.get("/api/v1/brands/");
        return response.data; // Returning the fetched data
    } catch (error) {
        console.error("Error fetching brands:", error);
        throw error; // Throwing error for handling in calling function
    }
};

export const getBrandById = async (id) => {
    try {
        const response = await axios.get(`/api/v1/brands/${id}`);
        return response.data; // Returning the fetched brand data
    } catch (error) {
        console.error(`Error fetching brand with ID ${id}:`, error);
        throw error; // Throwing error for handling in calling function
    }
};

export const createBrand = async (brandData) => {
    try {
        const response = await axios.post("/api/v1/brands/", brandData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data; // Returning the created brand data
    } catch (error) {
        console.error("Error creating brand:", error);
        throw error; // Throw error for handling in calling function
    }
};

export const updateBrand = async (id, brandData) => {
    try {
        const response = await axios.put(`/api/v1/brands/${id}`, brandData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data; // Returning the updated brand data
    } catch (error) {
        console.error(`Error updating brand with ID ${id}:`, error);
        throw error; // Throw error for handling in calling function
    }
};

export const deleteBrand = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/brands/${id}`);
        return response.data; // Returning the response data (if any)
    } catch (error) {
        console.error(`Error deleting brand with ID ${id}:`, error);
        throw error; // Throw error for handling in calling function
    }
};

