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

const counterOff = {
  backgroundColor: 'lightgrey',
  maxWidth: '5px',
  height: '10px',
  border: '1px solid red',
  padding: '5px',
  margin: '5px',
};

const counterOn = {
  backgroundColor: 'red',
  maxWidth: '5px',
  height: '10px',
  border: '1px solid red',
  padding: '5px',
  margin: '5px',
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
            {setCurrentSubBeat(state.subNote)}
            <div
              style={{
                height: '1em',
                display: 'flex',
                justifyContent: isCountIn() ? 'center' : 'left',
              }}
            >
              {isCountIn()
                ? Number(patternMaker.getSettings().timeSignature.beats) - state.qNote + 1
                : barCount > 0 &&
                  oneToBeatsPerBar.map((beat) => {
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
