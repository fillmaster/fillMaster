import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
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
}

const counterOff = {
  backgroundColor: 'lightgrey',
  width: '10px',
  height: '10px',
  border: '1px solid red',
  padding: '10px',
  margin: '10px',
};

const counterOn = {
  backgroundColor: 'red',
  width: '10px',
  height: '10px',
  border: '1px solid red',
  padding: '10px',
  margin: '10px',
};

const Metronome = ({ play, tempo, fillStart }: MetronomeProps) => {
  const patternMaker = PatternMaker.getInstance();
  const [noteDivision, setNoteDivision] = useState(
    patternMaker.getCustomSettingsForPattern().playNotes as string
  );
  const [timeSignatureTop, setTimeSignatureTop] = useState(
    patternMaker.getCustomSettingsForPattern().timeSignature.beats as string
  );
  const [timeSignatureBottom, setTimeSignatureBottom] = useState(
    patternMaker.getCustomSettingsForPattern().timeSignature.division as string
  );
  const [quarterNote, setQuarterNote] = useState(1);
  const oneToBeatsPerBar = getStringArrayBetweenTwoValues(1, quarterNote);

  const [barCount, setBarCount] = useState(-1);
  const isCountIn = () => barCount === 0 && play;
  const [metronomeString, setMetronomeString] = useState(patternMaker.getMetronomeString());
  const [key, setKey] = useState(0);

  const beatsPerBar = Number(patternMaker.getCustomSettingsForPattern().timeSignature.beats);

  const handleSetNoteDivision = (division: string) => {
    setNoteDivision(division);
  };

  const handleSetTimeSignatureTop = (beats: string) => {
    setTimeSignatureTop(beats);
    // refresh needed to restart metronome when beats per bar changes. Otherwise you may change time signature to e.g. 3/4 whilst
    // in 5/4 mode and you're on a note value higher than 3 which causes a 'no sound' error.
    setKey(key + 1);
  };

  const handleSetTimeSignatureBottom = (division: string) => {
    setTimeSignatureBottom(division);
    setKey(key + 1);
  };

  useEffect(() => {
    patternMaker.setCustomSettingsForPattern({
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
    if (barCount % 4 === 0) {
      setMetronomeString(patternMaker.getMetronomeStringWithFill());
    } else {
      setMetronomeString(patternMaker.getMetronomeString());
    }
  }, [barCount]);

  useEffect(() => {
    if (quarterNote === 1) {
      setBarCount(barCount + 1);
    }
  }, [quarterNote]);

  return (
    <div className="App">
      <Selectors
        timeSignatureTop={timeSignatureTop as BeatsPerBar}
        timeSignatureBottom={timeSignatureBottom as MeasureDivision}
        patternMaker={patternMaker}
        isCountIn={isCountIn}
        handleSetNoteDivision={handleSetNoteDivision}
        handleSetTimeSignatureTop={handleSetTimeSignatureTop}
        handleSetTimeSignatureBottom={handleSetTimeSignatureBottom}
      />
      <br />

      {barCount === 0 ? (
        // SETUP & COUNT-IN
        <>
          <ProMetronome
            bpm={Number(tempo)}
            subdivision={patternMaker.getSubDivision()}
            isPlaying={play}
            soundEnabled
            soundPattern={patternMaker.getMetronomeCountInString()}
            beatsPerBar={beatsPerBar}
            // temporary any for props and state
            render={(props: any, state: any) => (
              <div>
                {setQuarterNote(state.qNote)}
                <div style={{ height: '1em' }}>
                  {isCountIn() &&
                    Number(patternMaker.getCustomSettingsForPattern().timeSignature.beats) -
                      state.qNote +
                      1}
                </div>
              </div>
            )}
          />
          <br />
        </>
      ) : (
        // METRONOME START
        <ProMetronome
          bpm={Number(tempo)}
          subdivision={patternMaker.getSubDivision()}
          soundEnabled
          isPlaying={play}
          soundPattern={metronomeString}
          beatsPerBar={beatsPerBar}
          key={key}
          // temporary any for props and state
          render={(props: any, state: any) => (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              {setQuarterNote(state.qNote)}
              {oneToBeatsPerBar.map((beat) => {
                return (
                  <span key={`beat${beat}`}>
                    <time style={beat === state.qNote ? counterOn : counterOff}> </time>
                  </span>
                );
              })}
            </Box>
          )}
        />
      )}
    </div>
  );
};

export default Metronome;
