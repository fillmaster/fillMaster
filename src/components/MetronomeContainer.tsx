import { useState } from 'react';
import Selector from './elements/Selector';
import Metronome from './Metronome';

interface MetronomeContainerProps {
  render: boolean;
  restartMetronome: () => void;
  tempo: string;
  fillStart: string;
}

const MetronomeContainer = ({
  render,
  restartMetronome,
  tempo,
  fillStart,
}: MetronomeContainerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div style={{ height: '50px', padding: '50px' }}>
      {render ? (
        <Metronome play={isPlaying} tempo={tempo} fillStart={fillStart} />
      ) : (
        restartMetronome()
      )}
      <button type="button" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'STOP' : 'PLAY'}
      </button>
      <Selector selectorItems={[{ name: 'test', default: true, selected: true }]} />
    </div>
  );
};

export default MetronomeContainer;
