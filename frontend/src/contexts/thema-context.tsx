import React, { createContext, useState, useEffect, useContext } from 'react';
import { theme, ThemeType } from '../theme'; // theme 객체와 ThemeType을 가져옵니다
import { ThemeContextProps, ThemeProviderProps } from '../types'; // 타입을 가져옵니다

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // `themeMode` 상태를 `ThemeType`으로 설정합니다.
    const [themeMode, setThemeMode] = useState<ThemeType>(
        (localStorage.getItem('themeMode') as ThemeType) || (prefersDarkMode ? 'dark' : 'light')
    );

    useEffect(() => {
        localStorage.setItem('themeMode', themeMode);
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const value: ThemeContextProps = {
        theme: theme[themeMode],
        toggleTheme,
        themeType : themeMode,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// `useTheme` 훅을 정의합니다.
export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a CustomThemeProvider');
    }
    return context;
};
