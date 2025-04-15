import axios from "axios";

// Axios instance for customers API
const axiosInstance = axios.create({
    baseURL: "https://api.enrico.uz/api/v1/customers",
    headers: {
        "Content-Type": "application/json",
    },
});

// Create a customer
export const postCustomer = async (customerData) => {
    try {
        const response = await axiosInstance.post("/", {
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            extra_info: customerData.extra_info || {},
        });
        console.log("Customer added successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding customer:", error.response?.data || error.message);
        throw error;
    }
};

// Update customer by ID
export const updateCustomer = async (id, updatedData) => {
    try {
        const response = await axiosInstance.put(`/${id}`, updatedData);
        console.log("Customer updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating customer:", error.response?.data || error.message);
        throw error;
    }
};

// Get customer by ID
export const getCustomer = async (customerId) => {
    try {
        const response = await axiosInstance.get(`/${customerId}`);
        return response.data;
    } catch (error) {
        console.error("Error retrieving customer:", error.response?.data || error.message);
        throw error;
    }
};

// Get paginated customers
export const getCustomers = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get("/", {
            params: { page, limit },
        });
        console.log("Customers retrieved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving customers:", error.response?.data || error.message);
        throw error;
    }
};

// Alias for getting customer by ID (optional if `getCustomer` is used)
export const getCustomerById = getCustomer;

// Delete customer by ID
export const deleteCustomerById = async (id) => {
    try {
        const response = await axiosInstance.delete(`/${id}`);
        console.log("Customer deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting customer:", error.response?.data || error.message);
        throw error;
    }
};

// Get customer debits
export const getCustomerDebits = async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}/debits`);
        console.log("Customer debits retrieved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving customer debits:", error.response?.data || error.message);
        throw error;
    }
};

// Get all customers with debit
export const getDebitedCustomers = async () => {
    try {
        const response = await axiosInstance.get("/debited_customers");
        console.log("Debited customers retrieved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving debited customers:", error.response?.data || error.message);
        throw error;
    }
};
