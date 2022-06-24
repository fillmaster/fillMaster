import { ThemeProvider } from '@emotion/react';
import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import StepMenu from './components/StepMenu';
import defaultTheme from './Theme';

export const Drawer = createContext(false);
export const FillOnBar = createContext(4);
export const HelperSound = createContext(true);

const DEFAULTS = {
  drawerOpen: false,
  fillOnBar: 4,
  helperSound: true,
};

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(DEFAULTS.drawerOpen);
  const [fillOnBar, setFillOnBar] = useState(DEFAULTS.fillOnBar);
  const [helperSound, setHelperSound] = useState(DEFAULTS.helperSound);

  const resetAllSettings = () => {
    setDrawerOpen(DEFAULTS.drawerOpen);
    setFillOnBar(DEFAULTS.fillOnBar);
    setHelperSound(DEFAULTS.helperSound);
  };

  const handleSetDrawerOpen = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleSetFillOnBar = (fillOnBar_: number) => {
    setFillOnBar(fillOnBar_);
  };

  const handleSetHelperSound = (helperSound_: boolean) => {
    setHelperSound(helperSound_);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <HelperSound.Provider value={helperSound}>
        <FillOnBar.Provider value={fillOnBar}>
          <Drawer.Provider value={drawerOpen}>
            <Header
              setDrawerOpen={handleSetDrawerOpen}
              setFillOnBar={handleSetFillOnBar}
              setHelperSound={handleSetHelperSound}
              resetAllSettings={resetAllSettings}
            />
            <StepMenu />
          </Drawer.Provider>
        </FillOnBar.Provider>
      </HelperSound.Provider>
    </ThemeProvider>
  );
};

export default App;
