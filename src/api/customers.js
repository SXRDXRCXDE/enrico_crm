import axios from "axios";

export const postCustomer = async (customerData) => {
    try {
        const response = await axios.post("/api/v1/customers/", {
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            extra_info: customerData.extra_info || {}, // Default to empty object if not provided
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Customer added successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding customer:", error.response?.data || error.message);
        throw error;
    }
};

export const updateCustomer = async (id, updatedData) => {
    try {
        const response = await axios.put(`/api/v1/customers/${id}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Customer updated successfully:", response.data);
        return response.data; // Return updated data if needed
    } catch (error) {
        console.error("Error updating customer:", error.response ? error.response.data : error.message);
        throw error; // Re-throw the error for handling in calling components
    }
};

export const getCustomer = async (customerId) => {
    try {
        const response = await axios.get(`/api/v1/customers/${customerId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        // console.log("Customer retrieved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving customer:", error.response?.data || error.message);
        throw error;
    }
};

export const getCustomers = async (customerId) => {
    try {
        const response = await axios.get(`/api/v1/customers/`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Customer retrieved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving customer:", error.response?.data || error.message);
        throw error;
    }
};

export const getCustomerById = async (id) => {
    try {
        const response = await axios.get(`/api/v1/customers/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Customer retrieved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving customer:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteCustomerById = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/customers/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Customer deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting customer:", error.response?.data || error.message);
        throw error;
    }
};


export const getCustomerDebits = async (id) => {
    try {
        const response = await axios.get(`/api/v1/customers/${id}/debits`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Customer debits retrieved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving customer debits:", error.response?.data || error.message);
        throw error;
    }
};

export const getDebitedCustomers = async () => {
    try {
        const response = await axios.get("/api/v1/customers/debited_customers", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Debited customers retrieved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving debited customers:", error.response?.data || error.message);
        throw error;
    }
};
