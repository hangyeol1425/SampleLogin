import axiosInstance from '../axiosInstance';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedAccessToken && storedRefreshToken) {
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
        }
    }, []);

    const login = (newAccessToken: string, newRefreshToken: string) => {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/auth/logout', {
                refreshToken: refreshToken
            })
            setAccessToken(null);
            localStorage.removeItem('accessToken');
            setRefreshToken(null);
            localStorage.removeItem('refreshToken');
        } catch (error) {
            console.error('로그아웃 실패 : ' + error);
            throw new Error('로그아웃에 실패했습니다.');
        }
    };

    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};