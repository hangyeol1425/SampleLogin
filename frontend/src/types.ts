import { ReactNode } from 'react';
import { theme } from './theme';

type ThemeType = typeof theme.light | typeof theme.dark;

export interface ThemeContextProps {
    theme: ThemeType;
    toggleTheme: () => void;
}

export interface ThemeProviderProps {
    children: ReactNode;
}

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt?: string;
    updatedAt?: string;
}