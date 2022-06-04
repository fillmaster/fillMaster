import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

// permanent fix needed
// eslint-disable-next-line import/no-relative-packages
import ProMetronome from '../react-pro-metronome/src';
import PatternMaker, { BeatPosition, PlayNotes } from '../utils/classes/patternMaker';
import Selector from './elements/Selector';

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
  const [quarterNote, setQuarterNote] = useState(null);
  const [barCount, setBarCount] = useState(-1);
  const [metronomeString, setMetronomeString] = useState(patternMaker.getMetronomeString());

  const handleSetNoteDivision = (division: string) => {
    setNoteDivision(division);
  };

  useEffect(() => {
    patternMaker.setCustomSettingsForPattern({
      playNotes: noteDivision as PlayNotes,
      playFillOn: { beat: fillStart as BeatPosition, subBeat: '0' },
      beatsPerBar: '4',
    });
    setMetronomeString(patternMaker.getMetronomeString());
  }, [noteDivision, fillStart]);

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
      {/* Choose Note Division */}
      <Selector
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
          soundPattern="1000100010001000"
          // temporary any for props and state
          render={(props: any, state: any) => (
            <div>
              {setQuarterNote(state.qNote)}
              <div style={{ height: '1em' }}>
                <p>Get ready!</p>
                {5 - state.qNote}
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
