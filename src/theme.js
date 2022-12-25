import { createTheme } from '@mui/material/styles';

// See https://chakra-ui.com/docs/styled-system/theme
// https://github.com/sindresorhus/github-markdown-css/blob/main/github-markdown-light.css
const theme = createTheme({
    palette: {
        primary: {
            main: '#008080',
        },
        text: {
            secondary: '#4A5568',
        },
        grey: {
            50: '#F7FAFC',
            100: '#EDF2F7',
            200: '#E2E8F0',
            300: '#CBD5E0',
            400: '#A0AEC0',
            500: '#718096',
            600: '#4A5568',
            700: '#2D3748',
            800: '#1A202C',
            900: '#171923',
        },
    },
    typography: {
        fontSize: 13,
        fontFamily: 'Inter, sans-serif',
        h1: {
            fontSize: '2em',
            fontWeight: 600,
            marginTop: '24px',
            marginBottom: '16px',
            lineHeight: '1.25',
        },
        h2: {
            fontSize: '1.5em',
            fontWeight: 600,
            marginTop: '24px',
            marginBottom: '16px',
            lineHeight: '1.25',
        },
        h3: {
            fontSize: '1.25em',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1em',
            fontWeight: 600,
        },
        h5: {
            fontSize: '.875em',
            fontWeight: 600,
        },
        h6: {
            fontSize: '.85em',
            fontWeight: 600,
        },
        body1: {
            fontSize: '0.95em',
        },
    },
    shadows: [
        'none',
        'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
    ],
});

export default theme;
