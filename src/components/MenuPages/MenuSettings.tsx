import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const MenuSettings = () => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Play fills every</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="4"
      >
        <FormControlLabel value="2" control={<Radio />} label="2 bars" />
        <FormControlLabel value="4" control={<Radio />} label="4 bars" />
      </RadioGroup>
    </FormControl>
  );
};

export default MenuSettings;
