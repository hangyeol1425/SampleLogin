import { ThemeType } from "./theme";
import { LoaderFunction, ActionFunction } from "react-router-dom";
export interface ThemeContextProps {
    theme: any;
    toggleTheme: () => void;
    themeType: ThemeType,
}
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

export type RouteCommon = {
    loader?: LoaderFunction;
    action?: ActionFunction;
    ErrorBoundary?: React.ComponentType<any>;
};

export type IRoute = RouteCommon & {
    path: string;
    Element: React.ComponentType<any>;
};

export type Pages = {
    [key: string]: {
        default: React.ComponentType<any>;
        linkName?: string;
    } & RouteCommon;
};

export type Link = {
    path: string;
    name: string;
    children?: Link[];
};