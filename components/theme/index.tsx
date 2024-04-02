'use client'
import { createTheme as createMuiTheme } from '@mui/material';
import { createPalette } from './create-palette';
import { createComponents } from './create-components';
import { createShadows } from './create-shadows';
import { createTypography } from './create-typography';

export const theme = createTheme();

function createTheme() {
    const palette: any = createPalette();
    const components: any = createComponents({ palette });
    const shadows: any = createShadows();
    const typography: any = createTypography();

    return createMuiTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 360,
                md: 900,
                lg: 1200,
                xl: 1440
            }
        },
        components,
        palette,
        shadows,
        shape: {
            borderRadius: 8
        },
        typography
    });
}