import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuOptions from './Menu';

interface ResponsiveAppBarProps {
  setDrawerOpen: (open: boolean) => void;
  setFillOnBar: (fillBar: number) => void;
  setHelperSound: (helperSound: boolean) => void;
  resetAllSettings: () => void;
}

const ResponsiveAppBar = ({
  setDrawerOpen,
  setFillOnBar,
  setHelperSound,
  resetAllSettings,
}: ResponsiveAppBarProps) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              FILL MASTER
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuOptions
                setDrawerOpen={setDrawerOpen}
                setFillOnBar={setFillOnBar}
                setHelperSound={setHelperSound}
                resetAllSettings={resetAllSettings}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
