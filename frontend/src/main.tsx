import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './contexts/auth-context.tsx';
import { CustomThemeProvider, useTheme } from './contexts/thema-context.tsx';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle .tsx';
import './i18n';

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
