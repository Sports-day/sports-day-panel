import { alpha } from '@mui/material/styles';

const withAlphas = (color: any) => {
    return {
        ...color,
        alpha4: alpha(color.main, 0.04),
        alpha8: alpha(color.main, 0.08),
        alpha12: alpha(color.main, 0.12),
        alpha30: alpha(color.main, 0.30),
        alpha50: alpha(color.main, 0.50)
    };
};

export const neutral = {
    50: '#F8F9FA',
    100: '#E8EBF8',
    200: '#E8EBF8',
    300: '#99A5D6',
    400: '#99A5D6',
    500: '#99A5D6',
    600: '#435BBC',
    700: '#53629f',
    800: '#23398A',
    900: '#23398A'
};

export const indigo = withAlphas({
    lightest: '#F5F7FF',
    light: '#EBEEFE',
    main: '#506acb',
    dark: '#23398a',
    darkest: '#23398a',
    contrastText: '#FFFFFF'
});

export const success = withAlphas({
    lightest: '#F0FDF9',
    light: '#3FC79A',
    main: '#10B981',
    dark: '#0B815A',
    darkest: '#134E48',
    contrastText: '#FFFFFF'
});

export const info = withAlphas({
    lightest: '#ECFDFF',
    light: '#CFF9FE',
    main: '#06AED4',
    dark: '#0E7090',
    darkest: '#23398a',
    contrastText: '#FFFFFF'
});

export const warning = withAlphas({
    lightest: '#FFFAEB',
    light: '#FEF0C7',
    main: '#ffc900',
    dark: '#B54708',
    darkest: '#7A2E0E',
    contrastText: '#FFFFFF'
});

export const error = withAlphas({
    lightest: '#FEF3F2',
    light: '#FEE4E2',
    main: '#F04438',
    dark: '#B42318',
    darkest: '#7A271A',
    contrastText: '#FFFFFF'
});

export const sdblue = withAlphas({
    lightest: '#F0FDF9',
    light: '#e8ebf8',
    main: '#99a5d6',
    dark: '#435bbc',
    darkest: '#23398a',
    contrastText: '#FFFFFF'
});

export const accent = withAlphas({
    yellow: '#ffc900',
    cyan: '#47ccff',
    main: '#99a5d6',
    dark: '#23398a',
    darkest: '#000000',
    contrastText: '#FFFFFF'
});
