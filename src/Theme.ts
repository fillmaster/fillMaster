import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    selector: true;
  }
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: 'hsl(213, 78%, 50%)', // #1c76e3
    },
  },
});

export default defaultTheme;
