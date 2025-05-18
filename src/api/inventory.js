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
        const response = await axios.post(`/api/v1/inventory/`, data);
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
        const response = await axios.delete(`/api/v1/inventory/variants${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error deleting inventory item:", error);
        throw error;
    }
};


export const postInventoryVariant = async (variantData) => {
    try {
        const response = await axios.post('/api/v1/inventory/variants', variantData, {
            headers: {
                'Content-Type': 'application/json',
                // Include Authorization header if needed:
                // 'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting inventory variant:', error);
        throw error;
    }
};
