import PauseIcon from '@mui/icons-material/PauseCircleFilled';
import PlayIcon from '@mui/icons-material/PlayCircleFilled';
import StopIcon from '@mui/icons-material/StopCircle';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import PatternMaker from '../utils/classes/patternMaker';
import Metronome from './Metronome';

interface MetronomeContainerProps {
  tempo: string;
  fillStart: string;
  restartMetronome: () => void;
  patternMaker: PatternMaker;
  timeSignatureBottom: string;
  timeSignatureTop: string;
  setTimeSignatureBottom: (beats: string) => void;
  setTimeSignatureTop: (division: string) => void;
  handleSetCurrentBar: (bar: number) => void;
}

const MetronomeContainer = ({
  tempo,
  fillStart,
  restartMetronome,
  patternMaker,
  timeSignatureBottom,
  timeSignatureTop,
  setTimeSignatureBottom,
  setTimeSignatureTop,
  handleSetCurrentBar,
}: MetronomeContainerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <div style={{ height: '50px', padding: '50px' }}>
          <Metronome
            play={isPlaying}
            tempo={tempo}
            fillStart={fillStart}
            patternMaker={patternMaker}
            timeSignatureBottom={timeSignatureBottom}
            timeSignatureTop={timeSignatureTop}
            setTimeSignatureBottom={setTimeSignatureBottom}
            setTimeSignatureTop={setTimeSignatureTop}
            handleSetCurrentBar={handleSetCurrentBar}
          />
          <Button onClick={() => restartMetronome()}>
            <StopIcon />
          </Button>
          <Button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <PauseIcon onClick={() => setIsPlaying(!isPlaying)} />
            ) : (
              <PlayIcon onClick={() => setIsPlaying(!isPlaying)} />
            )}
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default MetronomeContainer;
