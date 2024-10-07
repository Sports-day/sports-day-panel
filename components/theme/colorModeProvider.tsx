'use client';
import { createTheme, ThemeProvider, useMediaQuery, PaletteMode } from '@mui/material';
import React, { useMemo } from 'react';
import { createShadows } from "@/components/theme/createShadows";

export type ColorModeProviderProps = {
    children: React.ReactNode;
};

const baseTheme = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 790,
            md: 1000,
            lg: 1200,
            xl: 1440
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': { boxSizing: 'border-box' },
                html: {
                    MozOsxFontSmoothing: 'grayscale',
                    WebkitFontSmoothing: 'antialiased',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
                body: {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
                '#__next': {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%'
                },
                'body::-webkit-scrollbar': {
                    width: '5px',
                    height: '8px'
                },
                '::-webkit-scrollbar': {
                    width: '5px',
                    height: '3px'
                },
                '::-webkit-scrollbar-track': {
                    background: "rgba(47,57,118,0)",
                    borderRadius:"10px"
                },
                '::-webkit-scrollbar-thumb': {
                    background: "rgba(92,105,187,0.8)",
                    borderRadius: '10px'
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 46,
                    height: 27,
                    padding: 0,
                    margin: 8,
                },
                switchBase: {
                    padding: 1,
                    '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                        transform: 'translateX(16px)',
                        color: '#fff',
                        '& + $track': {
                            opacity: 1,
                            border: 'none',
                        },
                    },
                },
                thumb: { width: 24, height: 24 },
                track: {
                    borderRadius: 13,
                    border: '1px solid #bdbdbd',
                    backgroundColor: '#fafafa',
                    opacity: 1,
                    transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                },
            },
        },
        MuiButtonBase: {
            defaultProps: { disableRipple: true }
        },
    },
    shape: { borderRadius: 12 },
    shadows: createShadows(),
};

const lightPalette = {
    mode: 'light' as PaletteMode, // 型キャストを追加
    primary: {
        main: '#EFF0F8',
        dark: '#4a5abb',
        light: '#5f6dc2',
    },
    secondary: {
        main: '#E0E2F2',
        contrastText: '#2f3c8c',
        dark: '#c6cbec',
        light: '#EFF0F8',
    },
    background: {
        paper: '#e1e4f6',
        default: '#eff0f8',
    },
    text: {
        primary: '#202753',
        secondary: '#6970a4',
        disabled: '#9fa4ce',
    },
    warning: {
        main: '#b9891a',
        contrastText: 'rgba(253,252,252,0.87)',
    },
    info: { main: '#5F6DC2' },
    divider: '#7f8cd6',
};

const darkPalette = {
    mode: 'dark' as PaletteMode, // 型キャストを追加
    primary: {
        main: '#22284F',
        dark: '#050925',
        light: '#373e6e',
    },
    secondary: {
        main: '#22284F',
        contrastText: '#eff0f8',
        dark: '#1c2141',
        light: '#373e6e',
    },
    background: {
        paper: '#22284F',
        default: '#181D3C',
    },
    text: {
        primary: '#eff0f8',
        secondary: '#99a5d6',
        disabled: '#5c628a',
    },
    warning: {
        main: '#b9891a',
        contrastText: 'rgba(253,252,252,0.87)',
    },
    info: { main: '#5F6DC2' },
    divider: '#373e6e',
};

export default function ColorModeProvider({ children }: ColorModeProviderProps) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(() => createTheme({
        ...baseTheme,
        palette: prefersDarkMode ? darkPalette : lightPalette,
    }), [prefersDarkMode]);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}