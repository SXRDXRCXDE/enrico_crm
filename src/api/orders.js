import axios from "axios";

// Axios instance for orders
const axiosInstance = axios.create({
    baseURL: "https://api.enrico.uz/api/v1/orders",
    headers: {
        "Content-Type": "application/json",
    },
});

// Get paginated list of orders
export const getOrders = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get("/", {
            params: { page, limit },
        });
        console.log("All Orders:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        throw error;
    }
};

// Get order by ID
export const getOrderById = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/${orderId}`);
        console.log("Order Details:", response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching order ${orderId}:`, error.response?.data || error.message);
        throw error;
    }
};

// Get order items by order ID
export const getOrderItemsById = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/${orderId}/items`);
        console.log(`Order ${orderId} Items:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching items for order ${orderId}:`, error.response?.data || error.message);
        throw error;
    }
};

// Get order payments by order ID
export const getOrderPaymentsById = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/${orderId}/payments`);
        console.log(`Payments for Order ${orderId}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching payments for order ${orderId}:`, error.response?.data || error.message);
        throw error;
    }
};

// Get order debits by order ID
export const getOrderDebitsById = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/${orderId}/debits`);
        console.log(`Debits for Order ${orderId}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching debits for order ${orderId}:`, error.response?.data || error.message);
        throw error;
    }
};

// Create a new order
export const createOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post("/", orderData);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        throw error;
    }
};

// Update an existing order
export const updateOrder = async (orderId, updatedData) => {
    try {
        const response = await axiosInstance.put(`/${orderId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error.response?.data || error.message);
        throw error;
    }
};
