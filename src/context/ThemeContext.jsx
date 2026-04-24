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
                main: '#4a72ff',
            },
            secondary: {
                main: '#f44336',
            },
            background: {
                default: darkMode ? '#0f172a' : '#f8fafd',
                paper: darkMode ? '#1e293b' : '#ffffff',
            },
            text: {
                primary: darkMode ? '#f8fafc' : '#1e293b',
                secondary: darkMode ? '#94a3b8' : '#64748b',
            },
        },
        shape: {
            borderRadius: 12,
        },
        overrides: {
            MuiPaper: {
                rounded: {
                    borderRadius: 16,
                },
            },
            MuiButton: {
                root: {
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 10,
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
