import PauseIcon from '@mui/icons-material/PauseCircleFilled';
import PlayIcon from '@mui/icons-material/PlayCircleFilled';
import StopIcon from '@mui/icons-material/StopCircle';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Drawer } from '../App';
import MetronomePattern from '../classes/pattern/metronomePattern';
import { BeatsPerBar } from '../constants/beatsPerBar';
import { MeasureDivision } from '../constants/measureDivisions';
import Metronome from './Metronome';

interface MetronomeContainerProps {
  tempo: string;
  fillStart: string;
  restartMetronome: () => void;
  patternMaker: MetronomePattern;
  timeSignatureBottom: MeasureDivision;
  timeSignatureTop: BeatsPerBar;
  setTimeSignatureTop: (beats: BeatsPerBar) => void;
  setTimeSignatureBottom: (division: MeasureDivision) => void;
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
  const settingsOpen = useContext(Drawer);
  const [wasPlayingOnSettingsOpen, setWasPlayingOnSettingsOpen] = useState(false);

  // pause metronome when opening settings menu
  useEffect(() => {
    if (settingsOpen && isPlaying) {
      setWasPlayingOnSettingsOpen(true);
      setIsPlaying(false);
    }
    if (!settingsOpen && wasPlayingOnSettingsOpen) {
      setIsPlaying(true);
      setWasPlayingOnSettingsOpen(false);
    }
  }, [settingsOpen]);

  return (
    <div style={{ height: '50px', padding: '30px' }}>
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
  );
};

export default MetronomeContainer;
