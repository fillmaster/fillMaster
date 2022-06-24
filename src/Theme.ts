import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    selector: true;
  }
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: 'hsl(212, 93%, 45%)',
    },
    secondary: {
      main: 'hsl(212, 83%, 47%)',
    },
  },
});

export default defaultTheme;
