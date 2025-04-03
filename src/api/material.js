import axios from "axios";

export const getMaterials = async () => {
    try {
        const response = await axios.get("/api/v1/materials/");
        return response.data;
    } catch (error) {
        console.error("Error fetching materials:", error);
        throw error;
    }
};

export const getMaterialById = async (id) => {
    try {
        const response = await axios.get(`/api/v1/materials/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching material by ID:", error);
        throw error;
    }
};

export const createMaterial = async (materialData) => {
    try {
        const response = await axios.post("/api/v1/materials/", materialData);
        return response.data;
    } catch (error) {
        console.error("Error creating material:", error);
        throw error;
    }
};

export const updateMaterial = async (id, materialData) => {
    try {
        const response = await axios.put(`/api/v1/materials/${id}`, materialData);
        return response.data;
    } catch (error) {
        console.error("Error updating material:", error);
        throw error;
    }
};

export const deleteMaterial = async (id) => {
    try {
        const response = await axios.delete(`/api/v1/materials/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting material:", error);
        throw error;
    }
};