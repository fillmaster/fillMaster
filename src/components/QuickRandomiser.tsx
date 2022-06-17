//   const beatIdeaAsText = <Typography>{beatIdea}</Typography>;

import RestartAllIcon from '@mui/icons-material/RestartAltRounded';
import { Button, Typography } from '@mui/material';
import BEAT_IDEAS from '../consts/forRandomiser/beatIdeas';
import FILL_STARTS from '../consts/forRandomiser/fillStarts';
import FILLS from '../consts/forRandomiser/fillTypes';
import { RandomiseMe, RANDOMISE_ME } from '../consts/forRandomiser/randomiseMe';
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
}: QuickRandomiserProps) => {
  const quickResetRandomiser = (randomsToReset: Array<RandomiseMe>) => {
    if (randomsToReset.includes('beatIdea')) setBeatIdea(shuffleArray([...BEAT_IDEAS])[0]);
    if (randomsToReset.includes('startFill')) setFillStart(shuffleArray([...FILL_STARTS])[0]);
    if (randomsToReset.includes('fill')) setFill(shuffleArray([...FILLS])[0]);
    if (randomsToReset.includes('tempo')) setTempo(shuffleArray([...tempoOptions()])[0]);
  };

  return (
    <>
      <div>
        <Typography>Drum Beat: {beatIdea}</Typography>
      </div>
      <b>
        <div>
          <Typography>Fill on Beat {fillStart} of bar 4</Typography>
        </div>
      </b>
      <b>
        <div>
          <Typography>Fill style: {fill}</Typography>
        </div>
      </b>
      <div>
        <Typography>@ {tempo} bpm</Typography>
      </div>
      <Button onClick={() => quickResetRandomiser([...RANDOMISE_ME])}>
        <RestartAllIcon />
      </Button>
    </>
  );
};

export default QuickRandomiser;
