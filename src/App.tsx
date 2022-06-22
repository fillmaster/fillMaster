import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import StepMenu from './components/StepMenu';

export const Drawer = createContext<boolean>(false);

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSetDrawerOpen = (open: boolean) => {
    setDrawerOpen(open);
  };
  return (
    <Drawer.Provider value={drawerOpen}>
      <Header handleSetDrawerOpen={handleSetDrawerOpen} />
      <StepMenu />
    </Drawer.Provider>
  );
};

export default App;
