'use client'
import {createTheme} from "@mui/material";
import {createShadows} from "@/components/theme/createShadows";

const shadows = createShadows();

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 790,
            md: 1000,
            lg: 1200,
            xl: 1440
        }
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#5f6dc2',
            dark: '#4a5abb',
            light: '#5f6dc2',
        },
        secondary: {
            main: '#e1e4f6',
            contrastText: '#2f3c8c',
            dark: '#afb4d3',
        },
        background: {
            paper: '#e1e4f6',
            default: '#eff0f8',
        },
        text: {
            primary: '#2f3c8c',
            secondary: '#4a5abb',
            disabled: '#7f8cd6',
        },
        warning: {
            main: '#b9891a',
            contrastText: 'rgba(253,252,252,0.87)',
        },
        info: {
            main: '#4a5abb',
        },
        divider: '#7f8cd6',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box'
                },
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
                thumb: {
                    width: 24,
                    height: 24,
                },
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
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows,
});