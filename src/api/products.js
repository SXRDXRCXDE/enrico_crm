import axios from "axios";

export const getProducts = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`/api/v1/products/`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`/api/v1/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};

export const getProductByBarcode = async (barcode) => {
    try {
        const response = await axios.get(`/api/v1/products/barcode/${barcode}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by barcode:", error);
        throw error;
    }
};

export const getFilteredProducts = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`/api/v1/products/filter?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching filtered products:", error);
        throw error;
    }
};


export const searchProducts = async (query, page = 1, limit = 10) => {
    try {
        const response = await axios.get(`/api/v1/products/search`, {
            params: { query, page, limit }
        });
        return response.data;
    } catch (error) {
        console.error("Error searching products:", error);
        throw error;
    }
};

export const createProduct = async (data) => {
    try {
        const response = await axios.post('/api/v1/products/', data);

        // Return the full response object, including the status code
        if (response.status === 200 || response.status === 201) {
            console.log('Product created:', response.data);
            return response;  // Return the entire response object
        }
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;  // Throw the error so it can be caught in the form
    }
};


export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`/api/v1/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};


export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};