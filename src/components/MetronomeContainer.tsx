import { useState } from 'react';
import Metronome from './Metronome';

interface MetronomeContainerProps {
  tempo: string;
  fillStart: string;
}

const MetronomeContainer = ({ tempo, fillStart }: MetronomeContainerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div style={{ height: '50px', padding: '50px' }}>
      <Metronome play={isPlaying} tempo={tempo} fillStart={fillStart} />
      <button type="button" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'STOP' : 'PLAY'}
      </button>
    </div>
  );
};

export default MetronomeContainer;
