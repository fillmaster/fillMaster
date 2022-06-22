import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import StepMenu from './components/StepMenu';

export const Drawer = createContext(false);
export const FillOnBar = createContext(4);

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fillOnBar, setFillOnBar] = useState(4);

  const handleSetDrawerOpen = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleSetFillOnBar = (fillOnBar_: number) => {
    setFillOnBar(fillOnBar_);
  };
  return (
    <FillOnBar.Provider value={fillOnBar}>
      <Drawer.Provider value={drawerOpen}>
        <Header setDrawerOpen={handleSetDrawerOpen} setFillOnBar={handleSetFillOnBar} />
        <StepMenu />
      </Drawer.Provider>
    </FillOnBar.Provider>
  );
};

export default App;
