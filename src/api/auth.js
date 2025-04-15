import axios from "axios";

const API_URL = "/api/v1/auth/login";

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(API_URL, {
            username,
            password
        });
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error("Login error:", error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
    }
};

export const registerUser = async (username, password) => {
    try {
        const response = await axios.post(API_URL, {
            username,
            password,
            role: "user",
        });
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error("Registration error:", error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
    }
};
