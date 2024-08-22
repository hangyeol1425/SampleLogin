import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/auth-context.tsx';
import { CustomThemeProvider, useTheme } from './context/thema-context.tsx';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle .tsx';

const RootComponent = () => {
    const { theme } = useTheme();

    return (
        <StyledThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
        </StyledThemeProvider>
    );
};

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <CustomThemeProvider>
            <RootComponent />
        </CustomThemeProvider>
    </AuthProvider>
);
