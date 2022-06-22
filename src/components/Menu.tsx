import MenuIcon from '@mui/icons-material/Menu';
import { SwipeableDrawer } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { KeyboardEvent, MouseEvent, SyntheticEvent, useState } from 'react';
import MenuAbout from './MenuPages/MenuAbout';
import MenuHelp from './MenuPages/MenuHelp';
import MenuSettings from './MenuPages/MenuSettings';
import MenuTabs from './MenuTabs';

export type TabName = 'Settings' | 'Help' | 'About';
type Anchor = 'right';
export interface BasicTabsProps {
  tab: TabName;
  handleSetTab: (event: SyntheticEvent, newValue: TabName) => void;
}

interface TemporaryDrawerProps {
  setDrawerOpen: (open: boolean) => void;
  setFillOnBar: (fillOnBar: number) => void;
}

const TemporaryDrawer = ({ setDrawerOpen, setFillOnBar }: TemporaryDrawerProps) => {
  const [state, setState] = useState({
    right: false,
  });
  const [tab, setTab] = useState<TabName>('Settings');
  const handleSetTab = (event: SyntheticEvent, newValue: TabName) => {
    setTab(newValue);
  };

  const renderTab = () => {
    switch (tab) {
      case 'Settings':
        return <MenuSettings setFillOnBar={setFillOnBar} />;
      case 'Help':
        return <MenuHelp />;
      case 'About':
        return <MenuAbout />;
      default:
        return null;
    }
  };

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
    setState({ ...state, [anchor]: open });
  };
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <>
      <MenuIcon onClick={toggleDrawer('right', true)} />
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
        PaperProps={{
          sx: { width: '80%' },
        }}
      >
        <Box>
          <MenuTabs tab={tab} handleSetTab={handleSetTab} />
          <Divider />
          {renderTab()}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default TemporaryDrawer;
