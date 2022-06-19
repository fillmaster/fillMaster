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
  patternMaker: PatternMaker;
  timeSignatureBottom: string;
  timeSignatureTop: string;
  setTimeSignatureBottom: (beats: string) => void;
  setTimeSignatureTop: (division: string) => void;
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

const Metronome = ({
  play,
  tempo,
  fillStart,
  patternMaker,
  timeSignatureBottom,
  timeSignatureTop,
  setTimeSignatureBottom,
  setTimeSignatureTop,
}: MetronomeProps) => {
  const [noteDivision, setNoteDivision] = useState(patternMaker.getSettings().playNotes as string);
  const [currentBeat, setCurrentBeat] = useState(1);
  const oneToBeatsPerBar = getStringArrayBetweenTwoValues(1, currentBeat);

  const [barCount, setBarCount] = useState(-1);
  const isCountIn = () => barCount === 0 && play;
  const [metronomeString, setMetronomeString] = useState(patternMaker.getMetronomeString());
  const beatsPerBar = Number(patternMaker.getSettings().timeSignature.beats);

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
    if (barCount % 4 === 0) {
      setMetronomeString(patternMaker.getMetronomeStringWithFill());
    } else {
      setMetronomeString(patternMaker.getMetronomeString());
    }
  }, [barCount]);

  useEffect(() => {
    if (currentBeat === 1) {
      setBarCount(barCount + 1);
    }
  }, [currentBeat]);

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
        // temporary any for props and state
        render={(props: any, state: any) => (
          <>
            {setCurrentBeat(state.qNote)}
            <div style={{ height: '1em' }}>
              {isCountIn()
                ? Number(patternMaker.getSettings().timeSignature.beats) - state.qNote + 1
                : oneToBeatsPerBar.map((beat) => {
                    return (
                      <span key={`beat${beat}`}>
                        <time style={beat === state.qNote ? counterOn : counterOff} />
                      </span>
                    );
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
