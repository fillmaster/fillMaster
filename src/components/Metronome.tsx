import { Box, lighten, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { FillOnBar, HelperSound } from '../App';
import { BeatsPerBar } from '../consts/beatsPerBar';
import { MeasureDivision } from '../consts/measureDivisions';
import { PlayNotes } from '../consts/playNotes';
// permanent fix needed
// eslint-disable-next-line import/no-relative-packages
import ProMetronome from '../react-pro-metronome/src';
import PatternMaker, { BeatPosition } from '../utils/classes/patternMaker';
import getStringArrayBetweenTwoValues from '../utils/getArrayBetweenValues';
import Selectors from './Selectors';

interface MetronomeProps {
  play: boolean;
  tempo: string;
  fillStart: string;
  patternMaker: PatternMaker;
  timeSignatureBottom: string;
  timeSignatureTop: string;
  setTimeSignatureBottom: (beats: string) => void;
  setTimeSignatureTop: (division: string) => void;
  handleSetCurrentBar: (bar: number) => void;
}

const Metronome = ({
  play,
  tempo,
  fillStart,
  patternMaker,
  timeSignatureBottom,
  timeSignatureTop,
  setTimeSignatureBottom,
  setTimeSignatureTop,
  handleSetCurrentBar,
}: MetronomeProps) => {
  const [noteDivision, setNoteDivision] = useState(patternMaker.getSettings().playNotes as string);
  const [currentBeat, setCurrentBeat] = useState(1);
  const [currentSubBeat, setCurrentSubBeat] = useState(0);
  const oneToBeatsPerBar = getStringArrayBetweenTwoValues(1, currentBeat);
  const helperSoundEnabled = useContext(HelperSound);

  const [barCount, setBarCount] = useState(-1);
  const isCountIn = () => barCount === 0 && play;
  const [metronomeString, setMetronomeString] = useState(patternMaker.getMetronomeString());
  const beatsPerBar = Number(patternMaker.getSettings().timeSignature.beats);
  const fillOnBar = useContext(FillOnBar);

  handleSetCurrentBar(barCount);

  const handleSetNoteDivision = (division: string) => {
    setNoteDivision(division);
  };

  useEffect(() => {
    patternMaker.setSettings({
      playNotes: noteDivision as PlayNotes,
      playFillOn: { beat: fillStart as BeatPosition, subBeat: '0' },
      timeSignature: {
        beats: timeSignatureTop as BeatsPerBar,
        division: timeSignatureBottom as MeasureDivision,
      },
    });
    setMetronomeString(patternMaker.getMetronomeString());
  }, [noteDivision, fillStart, timeSignatureTop, timeSignatureBottom]);

  useEffect(() => {
    if (barCount % fillOnBar === 0 && helperSoundEnabled) {
      setMetronomeString(patternMaker.getMetronomeStringWithFill());
    } else {
      setMetronomeString(patternMaker.getMetronomeString());
    }
  }, [barCount]);

  useEffect(() => {
    if (timeSignatureTop !== '1' && currentBeat === 1) {
      setBarCount(barCount + 1);
    }
  }, [currentBeat]);

  useEffect(() => {
    if (timeSignatureTop === '1' && currentSubBeat === 1) {
      setBarCount(barCount + 1);
    }
  }, [currentBeat, currentSubBeat]);

  const theme = useTheme();

  const counter = {
    backgroundColor: lighten(theme.palette.primary.main, 0.8),
    maxWidth: '5px',
    height: '10px',
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '5px',
    margin: '5px',
  };

  return (
    <div className="App">
      <Selectors
        timeSignatureTop={timeSignatureTop as BeatsPerBar}
        timeSignatureBottom={timeSignatureBottom as MeasureDivision}
        patternMaker={patternMaker}
        isCountIn={isCountIn}
        handleSetNoteDivision={handleSetNoteDivision}
        setTimeSignatureTop={setTimeSignatureTop}
        setTimeSignatureBottom={setTimeSignatureBottom}
      />
      <br />
      <ProMetronome
        bpm={Number(tempo)}
        subdivision={patternMaker.getSubDivision()}
        isPlaying={play}
        soundEnabled
        soundPattern={barCount === 0 ? patternMaker.getMetronomeCountInString() : metronomeString}
        beatsPerBar={beatsPerBar}
        render={(_, { qNote, subNote }) => (
          <>
            {setCurrentBeat(qNote)}
            {setCurrentSubBeat(subNote)}
            <div
              style={{
                height: '3em',
                display: 'flex',
                justifyContent: isCountIn() ? 'center' : 'left',
                marginLeft: '-35px', // sorry temporary horrible fix to stop 16 beats going off screen
              }}
            >
              {isCountIn()
                ? Number(patternMaker.getSettings().timeSignature.beats) - qNote + 1
                : barCount > 0 &&
                  oneToBeatsPerBar.map((beat) => {
                    return <Box sx={{ ...counter }} key={`beat${beat}`} />;
                  })}
            </div>
          </>
        )}
      />
      <br />
    </div>
  );
};

export default Metronome;
