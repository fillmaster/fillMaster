import RefreshIcon from '@mui/icons-material/RefreshRounded';
import { Button, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { FillOnBar } from '../App';
import beatIdeas from '../consts/forRandomiser/beatIdeas';
import fillStarts from '../consts/forRandomiser/fillStarts';
import fills from '../consts/forRandomiser/fillTypes';
import { RandomiseMe } from '../consts/forRandomiser/randomiseMe';
import MetronomePattern from '../utils/classes/patternMaker';
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
  patternMaker: MetronomePattern;
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
  const fillOnBar = useContext(FillOnBar);

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
            arrayToRandomise={beatIdeas(patternMaker.getPatternSettings().timeSignature.beats)}
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
          arrayToRandomise={fillStarts(patternMaker.getPatternSettings().timeSignature.beats)}
          handleSetItem={handleSetFillStart}
        />
        <span> of bar {fillOnBar}.</span>{' '}
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
