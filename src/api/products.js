import axios from "axios";

// Axios instance for products
const axiosInstance = axios.create({
    baseURL: "https://api.enrico.uz/api/v1/products",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getProducts = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get("/", { params: { page, limit } });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error.response?.data || error.message);
        throw error;
    }
};

export const getProductByBarcode = async (barcode) => {
    try {
        const response = await axiosInstance.get(`/barcode/${barcode}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by barcode:", error.response?.data || error.message);
        throw error;
    }
};

export const getFilteredProducts = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get(`/filter`, { params: { page, limit } });
        return response.data;
    } catch (error) {
        console.error("Error fetching filtered products:", error.response?.data || error.message);
        throw error;
    }
};

export const searchProducts = async (query, page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get(`/search`, {
            params: { query, page, limit }
        });
        return response.data;
    } catch (error) {
        console.error("Error searching products:", error.response?.data || error.message);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await axiosInstance.post("/", productData);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error.response?.data || error.message);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axiosInstance.put(`/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error.response?.data || error.message);
        throw error;
    }
};
