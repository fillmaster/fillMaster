import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import StepMenu from './components/StepMenu';

export const Drawer = createContext(false);
export const FillOnBar = createContext(4);
export const HelperSound = createContext(true);

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fillOnBar, setFillOnBar] = useState(4);
  const [helperSound, setHelperSound] = useState(true);

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
    <HelperSound.Provider value={helperSound}>
      <FillOnBar.Provider value={fillOnBar}>
        <Drawer.Provider value={drawerOpen}>
          <Header
            setDrawerOpen={handleSetDrawerOpen}
            setFillOnBar={handleSetFillOnBar}
            setHelperSound={handleSetHelperSound}
          />
          <StepMenu />
        </Drawer.Provider>
      </FillOnBar.Provider>
    </HelperSound.Provider>
  );
};

export default App;
