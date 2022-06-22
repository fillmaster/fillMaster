import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { ChangeEvent, useEffect, useState } from 'react';

interface MenuSettingsProps {
  setFillOnBar: (fillBar: number) => void;
}

const MenuSettings = ({ setFillOnBar }: MenuSettingsProps) => {
  const [value, setValue] = useState('4');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    setFillOnBar(Number(value));
  }, [value]);

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Play fills every</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="2" control={<Radio />} label="2 bars" />
        <FormControlLabel value="4" control={<Radio />} label="4 bars" />
      </RadioGroup>
    </FormControl>
  );
};

export default MenuSettings;
