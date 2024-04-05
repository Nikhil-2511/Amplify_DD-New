import { createTheme } from "@mui/material";
import SfFonts from '../fonts/SF_Compact_Rounded/SF-Compact-Rounded-Regular.otf';

const fontFamilyInstrument = "'Instrument Sans', sans-serif";

export const defaultFontTheme = createTheme({
  typography: {
    fontFamily: 'SF',
    fontSize: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
            @font-face {
              font-family: 'Sf';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Sf'), local('Sf-Regular'), url(${SfFonts}) format('woff2');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
    },
  }
})

export const LightThemeObject = createTheme({
  typography: {
    fontFamily: fontFamilyInstrument,
    fontSize: 14,
  },
  palette: {
    primary: {
      main: '#000',
      contrastText: '#fff'
    },
    secondary: {
      main: '#1D2939',
      contrastText: '#fff',
      dark: '#101828',
      light: '#344054'
    },
    accent: {
      main: '#7F56D9',
      contrastText: '#fff'
    },
    error: {
      main: '#F04438',
      contrastText: '#F04438',
    },
    warning: {
      main: '#D92D20',
      contrastText: '#fff',
    },
    info: {
      main: '#FF464D',
      contrastText: '#fff',
    },
    success: {
      main: '#027A48',
      contrastText: '#fff',
    },
    standered: {
      main: '#4C8DF1',
      contrastText: '#fff',
    },
    modalButton: {
      main: '#1D2939',
      contrastText: '#fff'
    },
    // modalStyling must be included in the theme
    modalStyling: {
      main: '#fff',
      contrastText: '#000'
    },
    tableGridStyling: {
      head: '#F9FAFB',
      contrastText: '#667085',
      body: 'transparent',
      border: '#e0e0e0',
      actionBorder: '#D0D5DD'
    }, 
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            color: 'red'
          },
          fieldset: {
            borderColor: '#353535',
            borderWidth: 0.5,
            background: '#121212',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#D6D6D6',
            borderWidth: 0.5,
          },
          '&.Mui-focused input': {
            color: '#fff'
          },
          '&.Mui-focused textarea': {
            color: '#fff'
          },
        }
      },
    }
  },
  customInputTheme: {
    // color/typographycolor: B5B5B5
    // background: 121212
    // border color: 353535
    // border-width: 0.5 
    // focused border color: D6D6D6                                                 
    // focused input/textarea/MuiTypography color: fff
    // error borderColor: FF8970
    // disabled border color
  }
})

export const DarkThemeObject = createTheme({
  typography: {
    fontFamily: 'SF',
    fontSize: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Sf';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Sf'), local('Sf-Regular'), url(${SfFonts}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
  palette: {
    primary: {
      main: '#121212',
      contrastText: '#fff'
    },
    secondary: {
      main: '#B5B5B5',
      contrastText: '#fff'
    },
    // modalStyling must be included in the theme
    modalStyling: {
      main: '#121212',
      contrastText: '#fff'
    },
    modalButton: {
      main: '#3247FF',
      contrastText: '#fff'
    },
    tableGridStyling: {
      head: '#161616',
      contrastText: '#fff',
      body: 'transparent',
      border: '#161616',
      actionBorder: '#D0D5DD'
    }, 
  },
})