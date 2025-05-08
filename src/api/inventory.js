import axios from "axios";

const BASE_URL = "/api/v1/inventory";

// Create inventory item
export const createInventory = async (data) => {
    const response = await axios.post(BASE_URL, data);
    return response.data;
};

// Get all inventory items
export const getInventory = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

// Update inventory item
export const updateInventory = async (id, data) => {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
};

// Delete inventory item
export const deleteInventory = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};
