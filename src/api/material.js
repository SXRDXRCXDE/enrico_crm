import axios from "axios";

// Axios instance for materials
const axiosInstance = axios.create({
    baseURL: "https://api.enrico.uz/api/v1/materials",
    headers: {
        "Content-Type": "application/json",
    },
});

// Get paginated list of materials
export const getMaterials = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get("/", {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching materials:", error);
        throw error;
    }
};

// Get material by ID
export const getMaterialById = async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching material by ID:", error);
        throw error;
    }
};

// Create a new material
export const createMaterial = async (materialData) => {
    try {
        const response = await axiosInstance.post("/", materialData);
        return response.data;
    } catch (error) {
        console.error("Error creating material:", error);
        throw error;
    }
};

// Update material by ID
export const updateMaterial = async (id, materialData) => {
    try {
        const response = await axiosInstance.put(`/${id}`, materialData);
        return response.data;
    } catch (error) {
        console.error("Error updating material:", error);
        throw error;
    }
};

// Delete material by ID
export const deleteMaterial = async (id) => {
    try {
        const response = await axiosInstance.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting material:", error);
        throw error;
    }
};
