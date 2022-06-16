import PauseIcon from '@mui/icons-material/PauseCircleFilled';
import PlayIcon from '@mui/icons-material/PlayCircleFilled';
import StopIcon from '@mui/icons-material/StopCircle';
import { Button } from '@mui/material';
import { useState } from 'react';
import Metronome from './Metronome';

interface MetronomeContainerProps {
  tempo: string;
  fillStart: string;
  restartMetronome: () => void;
}

const MetronomeContainer = ({ tempo, fillStart, restartMetronome }: MetronomeContainerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div style={{ height: '50px', padding: '50px' }}>
      <Metronome play={isPlaying} tempo={tempo} fillStart={fillStart} />
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
  );
};

export default MetronomeContainer;
