//   const beatIdeaAsText = <Typography>{beatIdea}</Typography>;

import RestartAllIcon from '@mui/icons-material/RestartAltRounded';
import { Button, Fade, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { FillOnBar } from '../App';
import { BeatsPerBar } from '../constsants/beatsPerBar';
import beatIdeas from '../constsants/forRandomiser/beatIdeas';
import fillStarts from '../constsants/forRandomiser/fillStarts';
import FILLS from '../constsants/forRandomiser/fillTypes';
import { RandomiseMe, RANDOMISE_ME } from '../constsants/forRandomiser/randomiseMe';
import shuffleArray from '../utils/randomFunctions';

const EXIT = 0;
const ENTER = 500;
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
  timeSignatureTop: string;
}

const QuickRandomiser = ({
  beatIdea,
  fillStart,
  fill,
  tempo,
  setBeatIdea,
  setFillStart,
  setFill,
  setTempo,
  tempoOptions,
  timeSignatureTop,
}: QuickRandomiserProps) => {
  const [beatIdeaVisible, setBeatIdeaVisible] = useState(true);
  const [fillStartVisible, setFillStartVisible] = useState(true);
  const [fillVisible, setFillVisible] = useState(true);
  const [tempoVisible, setTempoVisible] = useState(true);
  const fillOnBar = useContext(FillOnBar);

  const handleChange = (setItem: Dispatch<SetStateAction<boolean>>) => {
    setItem(false);
    setTimeout(() => setItem(true), 600);
  };

  const quickResetRandomiser = (randomsToReset: Array<RandomiseMe>) => {
    if (randomsToReset.includes('beatIdea')) {
      handleChange(setBeatIdeaVisible);
      setBeatIdea(shuffleArray(beatIdeas(timeSignatureTop as BeatsPerBar))[0]);
    }
    if (randomsToReset.includes('startFill')) {
      handleChange(setFillStartVisible);
      setFillStart(shuffleArray(fillStarts(timeSignatureTop as BeatsPerBar))[0]);
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

  useEffect(() => {
    quickResetRandomiser(['startFill', 'beatIdea']);
  }, [timeSignatureTop]);

  return (
    <>
      <div>
        <Fade
          in={beatIdeaVisible}
          timeout={{
            exit: EXIT,
            enter: ENTER,
          }}
        >
          <Typography>Drum Beat: {beatIdea}</Typography>
        </Fade>
      </div>
      <div>
        <Fade
          in={fillStartVisible}
          timeout={{
            exit: EXIT,
            enter: ENTER,
          }}
        >
          <Typography>
            Fill on Beat {fillStart} of bar {fillOnBar}
          </Typography>
        </Fade>
      </div>
      <div>
        <Fade
          in={fillVisible}
          timeout={{
            exit: EXIT,
            enter: ENTER,
          }}
        >
          <Typography>Fill style: {fill}</Typography>
        </Fade>
      </div>
      <div>
        <Fade
          in={tempoVisible}
          timeout={{
            exit: EXIT,
            enter: ENTER,
          }}
        >
          <Typography>@ {tempo} bpm</Typography>
        </Fade>
      </div>
      <Button onClick={() => quickResetRandomiser([...RANDOMISE_ME])}>
        <RestartAllIcon />
      </Button>
    </>
  );
};

export default QuickRandomiser;
