import { useState, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const BasicTabs = () => {
  const [value, setValue] = useState('Settings');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Settings" value="Settings" />
        <Tab label="Help" value="Help" />
        <Tab label="About" value="About" />
      </Tabs>
    </Box>
  );
};

export default BasicTabs;
