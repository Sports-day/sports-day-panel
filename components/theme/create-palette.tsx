import { alpha } from '@mui/material/styles';
import { error, indigo, info, neutral, success, warning, accent, sdblue } from './colors';

export function createPalette() {
    return {
        action: {
            active: neutral[500],
            disabled: alpha(neutral[900], 0.38),
            disabledBackground: alpha(neutral[900], 0.12),
            focus: alpha(neutral[900], 0.16),
            hover: alpha(neutral[900], 0.04),
            selected: alpha(neutral[900], 0.12)
        },
        background: {
            default: '#E8EBF8',
            paper: neutral[900]
        },
        divider: neutral[700],
        error,
        info,
        accent,
        sdblue,
        mode: 'light',
        neutral,
        primary: indigo,
        success,
        text: {
            primary: neutral[50],
            secondary: neutral[100],
            disabled: alpha(neutral[600], 0.38)
        },
        warning
    };
}
