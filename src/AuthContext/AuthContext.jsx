import React, { createContext, useContext, useState } from 'react';

// Создаём контекст
const AuthContext = createContext();

// Провайдер аутентификации
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние без localStorage

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования контекста
export const useAuth = () => {
    return useContext(AuthContext);
};
