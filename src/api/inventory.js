import axios from "axios";

const BASE_URL = "/api/v1/inventory/";

// Get inventory list with pagination and optional query (e.g., search, filters)
export const getInventory = async ({ page = 1, limit = 10, query = "" } = {}) => {
    try {
        const response = await axios.get("/api/v1/inventory/", {
            params: {
                page,
                limit,
                search: query, // Assumes your backend supports a `search` param
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error;
    }
};


// Create inventory item
export const createInventory = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error creating inventory item:", error);
        throw error;
    }
};

// Update inventory item
export const updateInventory = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}${id}/`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating inventory item:", error);
        throw error;
    }
};

// Delete inventory item
export const deleteInventory = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error deleting inventory item:", error);
        throw error;
    }
};
