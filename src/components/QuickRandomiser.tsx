//   const beatIdeaAsText = <Typography>{beatIdea}</Typography>;

import RestartAllIcon from '@mui/icons-material/RestartAltRounded';
import { Button, Fade, Typography } from '@mui/material';
import { Dispatch, forwardRef, SetStateAction, useState } from 'react';
import beatIdeas from '../consts/forRandomiser/beatIdeas';
import fillStarts from '../consts/forRandomiser/fillStarts';
import FILLS from '../consts/forRandomiser/fillTypes';
import { RandomiseMe, RANDOMISE_ME } from '../consts/forRandomiser/randomiseMe';
import PatternMaker from '../utils/classes/patternMaker';
import shuffleArray from '../utils/randomFunctions';

// <Fade in={checked}>{beatIdeaAsText}</Fade>

interface QuickRandomiserProps {
  beatIdea: string;
  fillStart: string;
  fill: string;
  tempo: string;
  setBeatIdea: (beat: string) => void;
  setFillStart: (start: string) => void;
  setFill: (_fill: string) => void;
  setTempo: (_tempo: string) => void;
  tempoOptions: () => Array<string>;
  patternMaker: PatternMaker;
}

const QuickRandomiser = (
  {
    beatIdea,
    fillStart,
    fill,
    tempo,
    setBeatIdea,
    setFillStart,
    setFill,
    setTempo,
    tempoOptions,
    patternMaker,
  }: QuickRandomiserProps,
  ref: any
) => {
  const [beatIdeaVisible, setBeatIdeaVisible] = useState(true);
  const [fillStartVisible, setFillStartVisible] = useState(true);
  const [fillVisible, setFillVisible] = useState(true);
  const [tempoVisible, setTempoVisible] = useState(true);

  const handleChange = (setItem: Dispatch<SetStateAction<boolean>>) => {
    setItem(false);
    setTimeout(() => setItem(true), 600);
  };

  const quickResetRandomiser = (randomsToReset: Array<RandomiseMe>) => {
    if (randomsToReset.includes('beatIdea')) {
      handleChange(setBeatIdeaVisible);
      setBeatIdea(shuffleArray(beatIdeas(patternMaker.getSettings().timeSignature.beats))[0]);
    }
    if (randomsToReset.includes('startFill')) {
      handleChange(setFillStartVisible);
      setFillStart(shuffleArray(fillStarts(patternMaker.getSettings().timeSignature.beats))[0]);
    }
    if (randomsToReset.includes('fill')) {
      handleChange(setFillVisible);
      setFill(shuffleArray([...FILLS])[0]);
    }
    if (randomsToReset.includes('tempo')) {
      handleChange(setTempoVisible);
      setTempo(shuffleArray([...tempoOptions()])[0]);
    }
  };

  return (
    <>
      <div>
        <Fade in={beatIdeaVisible}>
          <Typography>Drum Beat: {beatIdea}</Typography>
        </Fade>
      </div>
      <b>
        <div>
          <Fade in={fillStartVisible}>
            <Typography>Fill on Beat {fillStart} of bar 4</Typography>
          </Fade>
        </div>
      </b>
      <b>
        <div>
          <Fade in={fillVisible}>
            <Typography>Fill style: {fill}</Typography>
          </Fade>
        </div>
      </b>
      <div>
        <Fade in={tempoVisible}>
          <Typography>@ {tempo} bpm</Typography>
        </Fade>
      </div>
      <Button onClick={() => quickResetRandomiser([...RANDOMISE_ME])}>
        <RestartAllIcon />
      </Button>

      {/* trigger */}
      <Button
        ref={ref}
        onClick={() => quickResetRandomiser(['startFill', 'beatIdea'])}
        sx={{ display: 'none' }}
      />
    </>
  );
};

export default forwardRef(QuickRandomiser);