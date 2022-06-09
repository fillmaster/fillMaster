import { useState } from 'react';
import PatternMaker from '../utils/classes/patternMaker';
import Metronome from './Metronome';

interface MetronomeContainerProps {
  render: boolean;
  restartMetronome: () => void;
  tempo: string;
  fillStart: string;
  patternMaker: PatternMaker;
}

const MetronomeContainer = ({
  render,
  restartMetronome,
  tempo,
  fillStart,
  patternMaker,
}: MetronomeContainerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div style={{ height: '50px', padding: '50px' }}>
      {render ? (
        <Metronome play={isPlaying} tempo={tempo} fillStart={fillStart} patternMaker={patternMaker}/>
      ) : (
        restartMetronome()
      )}
      <button type="button" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'STOP' : 'PLAY'}
      </button>
    </div>
  );
};

export default MetronomeContainer;
