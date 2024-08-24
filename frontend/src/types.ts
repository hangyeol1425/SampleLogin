import { ThemeType } from "./theme";
export interface ThemeContextProps {
    theme: any;
    toggleTheme: () => void;
    themeType : ThemeType,
}

// ThemeProvider의 props 타입
export interface ThemeProviderProps {
    children: React.ReactNode;
}

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt?: string;
    updatedAt?: string;
}