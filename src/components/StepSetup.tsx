import RefreshIcon from '@mui/icons-material/RefreshRounded';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import beatIdeas from '../consts/forRandomiser/beatIdeas';
import fillStarts from '../consts/forRandomiser/fillStarts';
import fills from '../consts/forRandomiser/fillTypes';
import { RandomiseMe } from '../consts/forRandomiser/randomiseMe';
import PatternMaker from '../utils/classes/patternMaker';
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
  patternMaker: PatternMaker;
}

const SetupStep = ({
  index,
  handleSetBeatIdea,
  handleSetFill,
  handleSetFillStart,
  handleSetTempo,
  handleSetSliderValues,
  sliderValues,
  patternMaker,
}: SetupStepProps) => {
  const [beatIdeaKey, setBeatIdeaKey] = useState(0);
  const [startFillKey, setStartFillKey] = useState(0);
  const [fillKey, setFillKey] = useState(0);
  const [tempoKey, setTempoKey] = useState(0);

  const resetRandomiser = (randomToReset: RandomiseMe) => {
    if (randomToReset === 'beatIdea') setBeatIdeaKey(beatIdeaKey + 1);
    if (randomToReset === 'startFill') setStartFillKey(startFillKey + 1);
    if (randomToReset === 'fill') setFillKey(fillKey + 1);
    if (randomToReset === 'tempo') setTempoKey(tempoKey + 1);
  };

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
            arrayToRandomise={beatIdeas(patternMaker.getSettings().timeSignature.beats)}
            handleSetItem={handleSetBeatIdea}
          />
        </b>
        <div>When you&apos;ve thought of something, continue...</div>
        <Button onClick={() => resetRandomiser('beatIdea')}>
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
          arrayToRandomise={fillStarts(patternMaker.getSettings().timeSignature.beats)}
          handleSetItem={handleSetFillStart}
        />
        <span> of bar 4.</span>{' '}
        <div>
          <Button onClick={() => resetRandomiser('startFill')}>
            <RefreshIcon />
          </Button>
        </div>
      </>
    );
  if (index === 3)
    return (
      <>
        <b>
          <Randomiser key={fillKey} arrayToRandomise={fills} handleSetItem={handleSetFill} />
        </b>
        <div>
          <Button onClick={() => resetRandomiser('fill')}>
            <RefreshIcon />
          </Button>
        </div>
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
        <Button onClick={() => resetRandomiser('tempo')}>
          <RefreshIcon />
        </Button>
      </>
    );
  return null;
};

export default SetupStep;
