import axios from "axios";

export const getOrders = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get("/api/v1/orders/", {
            params: {
                page: page,   // Page number
                limit: limit, // Number of items per page
            },
        });
        console.log("All Orders:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        throw error;
    }
};

export const getOrderById = async (orderId) => {
    try {
        const response = await axios.get(`/api/v1/orders/${orderId}`);
        console.log("Order Details:", response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching order ${orderId}:`, error.response?.data || error.message);
        throw error;
    }
};


export const getOrderItemsById = async (orderId) => {
    try {
        const response = await axios.get(`/api/v1/orders/${orderId}/items`);
        console.log(`Order ${orderId} Items:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching items for order ${orderId}:`, error.response?.data || error.message);
        throw error;
    }
};

export const getOrderPaymentsById = async (orderId) => {
    try {
        const response = await axios.get(`/api/v1/orders/${orderId}/payments`);
        console.log(`Payments for Order ${orderId}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching payments for order ${orderId}:`, error.response?.data || error.message);
        throw error;
    }
};

export const getOrderDebitsById = async (orderId) => {
    try {
        const response = await axios.get(`/api/v1/orders/${orderId}/debits`);
        console.log(`Debits for Order ${orderId}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching debits for order ${orderId}:`, error.response?.data || error.message);
        throw error;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post("https://api.enrico.uz/api/v1/orders/", orderData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        throw error;
    }
};

export const updateOrder = async (orderId, updatedData) => {
    try {
        const response = await axios.put(`https://api.enrico.uz/api/v1/orders/${orderId}/`, updatedData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error.response?.data || error.message);
        throw error;
    }
};