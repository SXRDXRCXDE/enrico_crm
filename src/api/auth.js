import axios from "axios";

const apiUrl = process.env.REACT_APP_URL; // Get the base URL from .env

const API_URL = `/api/v1/auth/login`;

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(API_URL, {
            username,
            password
        });

        // Store tokens as cookies
        if (response.data.access && response.data.refresh) {
            document.cookie = `access_token=${response.data.access}; path=/;`;
            document.cookie = `refresh_token=${response.data.refresh}; path=/;`;
        }

        return response.data; // Return the response data (tokens)
    } catch (error) {
        console.error("Login error:", error);
        throw error; // Rethrow the error to be handled in the component
    }
};

export const registerUser = async (username, password) => {
    try {
        const response = await axios.post(API_URL, {
            username,
            password,
            role: "user",
        });

        // Store tokens as cookies after registration
        if (response.data.access && response.data.refresh) {
            document.cookie = `access_token=${response.data.access}; path=/;`;
            document.cookie = `refresh_token=${response.data.refresh}; path=/;`;
        }

        return response.data; // Return the response data (tokens)
    } catch (error) {
        console.error("Registration error:", error);
        throw error; // Rethrow the error to be handled in the component
    }
};
