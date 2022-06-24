import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    selector: true;
  }
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: 'hsl(213, 94%, 45%)',
    },
  },
});

export default defaultTheme;
