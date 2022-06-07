import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { BeatsPerBar, BEATS_PER_BAR } from '../consts/beatsPerBar';
import { MeasureDivision, MEASURE_DIVISIONS } from '../consts/measureDivisions';
// permanent fix needed
// eslint-disable-next-line import/no-relative-packages
import ProMetronome from '../react-pro-metronome/src';
import PatternMaker, { BeatPosition, PlayNotes } from '../utils/classes/patternMaker';
import MeasureBottomSelector from './elements/MeasureBottomSelector';
import MeasureTopSelector from './elements/MeasureTopSelector';
import NoteDivisionSelector from './elements/NoteDivisionSelector';

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
  const [quarterNote, setQuarterNote] = useState(null);
  const [barCount, setBarCount] = useState(-1);
  const [metronomeString, setMetronomeString] = useState(patternMaker.getMetronomeString());
  const [key, setKey] = useState(0);

  const beatsPerBar = Number(patternMaker.getCustomSettingsForPattern().timeSignature.beats);

  const handleSetNoteDivision = (division: string) => {
    setNoteDivision(division);
  };

  const handleSetTimeSignatureTop = (beats: string) => {
    setTimeSignatureTop(beats);
    setKey(key + 1);
  };

  const handleSetTimeSignatureBottom = (division: string) => {
    setTimeSignatureBottom(division);
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
      <div>
        <MeasureTopSelector
          selectorItems={getMeasureTopSelectorValues([...BEATS_PER_BAR], '4')}
          handleSetItem={handleSetTimeSignatureTop}
        />
        <MeasureBottomSelector
          selectorItems={getMeasureBottomSelectorValues([...MEASURE_DIVISIONS], '4')}
          handleSetItem={handleSetTimeSignatureBottom}
        />
      </div>
      <br />
      <NoteDivisionSelector
        selectorItems={[
          {
            name: 'Whole Notes',
            default: false,
            previewName: '𝅝',
            stateName: 'firstNoteOnly',
          },
          {
            name: 'Half Notes',
            default: false,
            previewName: '𝅗𝅥',
            stateName: 'halfNotes',
          },
          {
            name: 'Quarter Notes',
            default: true,
            previewName: '𝅘𝅥',
            stateName: 'quarterNotes',
          },
          {
            name: 'Eighth Notes',
            default: false,
            previewName: '𝅘𝅥𝅮',
            stateName: 'eighthNotes',
          },
          {
            name: 'Sixteenth Notes',
            default: false,
            previewName: '𝅘𝅥𝅯',
            stateName: 'sixteenthNotes',
          },
        ]}
        handleSetItem={handleSetNoteDivision}
      />
      <br />

      {barCount === 0 ? (
        // COUNT-IN
        <ProMetronome
          bpm={Number(tempo)}
          subdivision={4}
          isPlaying={play}
          soundEnabled
          soundPattern={patternMaker.getMetronomeCountInString()}
          beatsPerBar={beatsPerBar}
          // temporary any for props and state
          render={(props: any, state: any) => (
            <div>
              {setQuarterNote(state.qNote)}
              <div style={{ height: '1em' }}>
                <p>Get ready!</p>
                {Number(patternMaker.getCustomSettingsForPattern().timeSignature.beats) -
                  state.qNote +
                  1}
              </div>
            </div>
          )}
        />
      ) : (
        // METRONOME START
        <ProMetronome
          bpm={Number(tempo)}
          subdivision={4}
          soundEnabled
          isPlaying={play}
          soundPattern={metronomeString}
          beatsPerBar={beatsPerBar}
          key={key}
          // temporary any for props and state
          render={(props: any, state: any) => (
            <Box>
              <div>
                {setQuarterNote(state.qNote)}
                {state.qNote === 1 && (
                  <div>
                    <time style={counterOn}> </time> <time style={counterOff}> </time>{' '}
                    <time style={counterOff}> </time> <time style={counterOff}> </time>
                  </div>
                )}
                {state.qNote === 2 && (
                  <div>
                    <time style={counterOff}> </time> <time style={counterOn}> </time>{' '}
                    <time style={counterOff}> </time> <time style={counterOff}> </time>
                  </div>
                )}
                {state.qNote === 3 && (
                  <div>
                    <time style={counterOff}> </time> <time style={counterOff}> </time>{' '}
                    <time style={counterOn}> </time> <time style={counterOff}> </time>
                  </div>
                )}
                {state.qNote === 4 && (
                  <div>
                    <time style={counterOff}> </time> <time style={counterOff}> </time>{' '}
                    <time style={counterOff}> </time> <time style={counterOn}> </time>
                  </div>
                )}
                <div style={{ height: '1em' }} />
              </div>
            </Box>
          )}
        />
      )}
    </div>
  );
};

export default Metronome;

function getMeasureTopSelectorValues(beatArray: Array<BeatsPerBar>, default_: BeatsPerBar) {
  const array = [];
  for (let i = 0; i < beatArray.length; i++) {
    const name = beatArray[i];
    const defaultVar = beatArray[i] === default_;
    const stateName = beatArray[i];
    array.push({ name, default: defaultVar, stateName });
  }
  return array;
}

function getMeasureBottomSelectorValues(
  divisionArray: Array<MeasureDivision>,
  default_: MeasureDivision
) {
  const array = [];
  for (let i = 0; i < divisionArray.length; i++) {
    const name = divisionArray[i];
    const defaultVar = divisionArray[i] === default_;
    const stateName = divisionArray[i];
    array.push({ name, default: defaultVar, stateName });
  }
  return array;
}
