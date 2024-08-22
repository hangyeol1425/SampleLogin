import React, { createContext, useState, useEffect, useContext } from 'react';
import { theme } from '../theme';
import { ThemeContextProps, ThemeProviderProps } from '../types';

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>(
        localStorage.getItem('themeMode') as 'light' | 'dark' || (prefersDarkMode ? 'dark' : 'light')
    );

    useEffect(() => {
        localStorage.setItem('themeMode', themeMode);
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const value = {
        theme: theme[themeMode],
        toggleTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a CustomThemeProvider');
    }
    return context;
};