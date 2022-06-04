import { Typography } from '@mui/material';
import beatIdeas from '../consts/beatIdeas';
import fillStarts from '../consts/fillStarts';
import fills from '../consts/fillTypes';
import Randomiser from './Randomiser';
import TempoChooser from './TempoChooser';
import getStringArrayBetweenTwoValues from '../utils/getArrayBetweenValues';
import Selector from './elements/Selector';

interface SetupStepProps {
  index: number;
  handleSetBeatIdea: (beatIdea: string) => void;
  handleSetFillStart: (fillStart: string) => void;
  handleSetFill: (fill: string) => void;
  handleSetTempo: (tempo: string) => void;
  handleSetSliderValues: (sliderValues: Array<number>) => void;
  sliderValues: Array<number>;
}

const SetupStep = ({
  index,
  handleSetBeatIdea,
  handleSetFill,
  handleSetFillStart,
  handleSetTempo,
  handleSetSliderValues,
  sliderValues,
}: SetupStepProps) => {
  if (index === 0)
    return (
      <TempoChooser handleSetSliderValues={handleSetSliderValues} sliderValues={sliderValues} />
    );
  if (index === 1)
    return (
      <>
        <b>
          <Randomiser arrayToRandomise={beatIdeas} handleSetItem={handleSetBeatIdea} />
        </b>
        <div>When you&apos;ve thought of something, continue...</div>
        <Selector
          selectorItems={[
            { name: 'Whole Notes', default: false, previewName: 'o' },
            { name: 'Half Notes', default: false, previewName: 'o' },
            { name: 'Quarter Notes', default: false, previewName: '♩' },
            { name: 'Eighth Notes', default: true, previewName: '♫' },
            { name: 'Sixteenth Notes', default: false, previewName: '♬♬' },
          ]}
        />
      </>
    );
  if (index === 2)
    return (
      <>
        <span>Start your drum fill on beat </span>
        <Randomiser arrayToRandomise={fillStarts} handleSetItem={handleSetFillStart} />
        <span> of bar 4.</span>
      </>
    );
  if (index === 3)
    return (
      <b>
        <Randomiser arrayToRandomise={fills} handleSetItem={handleSetFill} />
      </b>
    );
  if (index === 4)
    return (
      <b>
        <Typography>
          Tempo:{' '}
          <Randomiser
            arrayToRandomise={getStringArrayBetweenTwoValues(sliderValues[0], sliderValues[1])}
            handleSetItem={handleSetTempo}
          />{' '}
          bpm
        </Typography>
      </b>
    );
  return null;
};

export default SetupStep;
