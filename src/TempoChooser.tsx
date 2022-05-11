import { Box, Slider } from '@mui/material';

function valuetext(value: number) {
  return `${value}bpm`;
}

const minDistance = 30;

interface TempoChooserProps {
  handleSetSliderValues: (sliderValues: Array<number>) => void;
  sliderValues: Array<number>;
}

const TempoChooser = ({ handleSetSliderValues, sliderValues }: TempoChooserProps) => {
  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      handleSetSliderValues([
        Math.min(newValue[0], sliderValues[1] - minDistance),
        sliderValues[1],
      ]);
    } else {
      handleSetSliderValues([
        sliderValues[0],
        Math.max(newValue[1], sliderValues[0] + minDistance),
      ]);
    }
  };

  return (
    <Box sx={{ width: 300, mt: '50px' }}>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={sliderValues}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        disableSwap
        min={20}
        max={240}
      />
    </Box>
  );
};

export default TempoChooser;
