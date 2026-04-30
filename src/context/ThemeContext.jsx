import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved === 'true' ? true : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const theme = useMemo(() => createTheme({
        palette: {
            type: darkMode ? 'dark' : 'light',
            primary: {
                main: '#6366f1', // Indigo 500
                light: '#818cf8',
                dark: '#4f46e5',
            },
            secondary: {
                main: '#f43f5e', // Rose 500
            },
            background: {
                default: darkMode ? '#0f172a' : '#f8fafc',
                paper: darkMode ? '#1e293b' : '#ffffff',
            },
            text: {
                primary: darkMode ? '#ffffff' : '#000000',
                secondary: darkMode ? '#cbd5e1' : '#475569',
            },
            divider: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h4: { fontWeight: 800, letterSpacing: '-0.02em' },
            h5: { fontWeight: 800, letterSpacing: '-0.01em' },
            h6: { fontWeight: 700, letterSpacing: '-0.01em' },
            subtitle1: { fontWeight: 600 },
            subtitle2: { fontWeight: 600 },
            body1: { fontSize: '1rem', lineHeight: 1.6 },
            body2: { fontSize: '0.875rem', lineHeight: 1.6 },
            button: { textTransform: 'none', fontWeight: 700 },
        },
        shape: {
            borderRadius: 12,
        },
        overrides: {
            MuiPaper: {
                rounded: {
                    borderRadius: 20,
                },
                elevation1: {
                    boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.05)',
                },
            },
            MuiButton: {
                root: {
                    borderRadius: 12,
                    padding: '8px 20px',
                    transition: 'all 0.2s ease-in-out',
                },
                containedPrimary: {
                    boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
                    '&:hover': {
                        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.23)',
                        transform: 'translateY(-1px)',
                    },
                },
            },
        },
    }), [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
