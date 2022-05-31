import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box/';
import { BasicTabsProps } from './Menu';



const BasicTabs = ({ tab, handleSetTab }: BasicTabsProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tab} onChange={handleSetTab}>
        <Tab label="Settings" value="Settings" />
        <Tab label="Help" value="Help" />
        <Tab label="About" value="About" />
      </Tabs>
    </Box>
  );
};

export default BasicTabs;
