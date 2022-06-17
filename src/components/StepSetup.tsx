import RefreshIcon from '@mui/icons-material/RefreshRounded';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import beatIdeas from '../consts/forRandomiser/beatIdeas';
import fillStarts from '../consts/forRandomiser/fillStarts';
import fills from '../consts/forRandomiser/fillTypes';
import getStringArrayBetweenTwoValues from '../utils/getArrayBetweenValues';
import Randomiser from './Randomiser';
import TempoChooser from './TempoChooser';

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
  const [beatIdeaKey, setBeatIdeaKey] = useState(0);
  const [startFillKey, setStartFillKey] = useState(0);
  const [fillKey, setFillKey] = useState(0);
  const [tempoKey, setTempoKey] = useState(0);

  type RandomiseMe = 'beatIdea' | 'startFill' | 'fill' | 'tempo';
  const resetRandomiser = (randomsToReset: Array<RandomiseMe>) => {
    if (randomsToReset.includes('beatIdea')) setBeatIdeaKey(beatIdeaKey + 1);
    if (randomsToReset.includes('startFill')) setStartFillKey(startFillKey + 1);
    if (randomsToReset.includes('fill')) setFillKey(fillKey + 1);
    if (randomsToReset.includes('tempo')) setTempoKey(tempoKey + 1);
  };

  // const handleResetAllRandoms

  if (index === 0)
    return (
      <TempoChooser handleSetSliderValues={handleSetSliderValues} sliderValues={sliderValues} />
    );
  if (index === 1)
    return (
      <>
        <b>
          <Randomiser
            key={beatIdeaKey}
            arrayToRandomise={beatIdeas}
            handleSetItem={handleSetBeatIdea}
          />
        </b>
        <div>When you&apos;ve thought of something, continue...</div>
        <Button onClick={() => resetRandomiser(['beatIdea'])}>
          <RefreshIcon />
        </Button>
      </>
    );
  if (index === 2)
    return (
      <>
        <span>Start your drum fill on beat </span>
        <Randomiser
          key={startFillKey}
          arrayToRandomise={fillStarts}
          handleSetItem={handleSetFillStart}
        />
        <span> of bar 4.</span>{' '}
        <span>
          <Button onClick={() => resetRandomiser(['startFill'])}>
            <RefreshIcon />
          </Button>
        </span>
      </>
    );
  if (index === 3)
    return (
      <>
        <b>
          <Randomiser key={fillKey} arrayToRandomise={fills} handleSetItem={handleSetFill} />
        </b>
        <Button onClick={() => resetRandomiser(['fill'])}>
          <RefreshIcon />
        </Button>
      </>
    );
  if (index === 4)
    return (
      <>
        <b>
          <Typography>
            Tempo:{' '}
            <Randomiser
              key={tempoKey}
              arrayToRandomise={getStringArrayBetweenTwoValues(sliderValues[0], sliderValues[1])}
              handleSetItem={handleSetTempo}
            />{' '}
            bpm
          </Typography>
        </b>
        <Button onClick={() => resetRandomiser(['tempo'])}>
          <RefreshIcon />
        </Button>
      </>
    );
  return null;
};

export default SetupStep;
