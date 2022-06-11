import { useEffect, useState } from 'react';
import { BeatsPerBar, BEATS_PER_BAR } from '../consts/beatsPerBar';
import { MeasureDivision, MEASURE_DIVISIONS } from '../consts/measureDivisions';
import {
  getNamesForPlayNotes,
  getPlayNotesByMeasureDivision,
  getUnicodeForPlayNotes,
  PlayNotes,
  PLAY_NOTES,
} from '../consts/playNotes';
import PatternMaker from '../utils/classes/patternMaker';
import MeasureBottomSelector from './elements/MeasureBottomSelector';
import MeasureTopSelector from './elements/MeasureTopSelector';
import NoteDivisionSelector from './elements/NoteDivisionSelector';

interface SelectorsProps {
  timeSignatureBottom: MeasureDivision;
  patternMaker: PatternMaker;
  isCountIn: () => boolean;
  handleSetNoteDivision: (division: string) => void;
  handleSetTimeSignatureTop: (beats: string) => void;
  handleSetTimeSignatureBottom: (division: string) => void;
}
const Selectors = ({
  timeSignatureBottom,
  patternMaker,
  isCountIn,
  handleSetNoteDivision,
  handleSetTimeSignatureTop,
  handleSetTimeSignatureBottom,
}: SelectorsProps) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey(key + 1);
  }, [timeSignatureBottom]);

  return (
    <>
      <div>
        <MeasureTopSelector
          selectorItems={getMeasureTopSelectorValues(
            [...BEATS_PER_BAR],
            '4',
            patternMaker.getCustomSettingsForPattern().timeSignature.beats
          )}
          handleSetItem={handleSetTimeSignatureTop}
          disabled={isCountIn()}
        />
        <MeasureBottomSelector
          selectorItems={getMeasureBottomSelectorValues(
            [...MEASURE_DIVISIONS],
            '4',
            patternMaker.getCustomSettingsForPattern().timeSignature.division
          )}
          handleSetItem={handleSetTimeSignatureBottom}
          disabled={isCountIn()}
        />
      </div>
      <br />
      <NoteDivisionSelector
        selectorItems={getPlayNoteValues(
          [...PLAY_NOTES],
          timeSignatureBottom as MeasureDivision,
          getPlayNotesByMeasureDivision(timeSignatureBottom)
        )}
        handleSetItem={handleSetNoteDivision}
        disabled={isCountIn()}
        key={key}
      />
    </>
  );
};

export default Selectors;

function getPlayNoteValues(
  playNotesArray: Array<PlayNotes>,
  default_: MeasureDivision,
  selected_: PlayNotes
) {
  const array = [];
  for (let i = 0; i < playNotesArray.length; i++) {
    const name = getNamesForPlayNotes(playNotesArray[i]);
    const defaultVar = playNotesArray[i] === getPlayNotesByMeasureDivision(default_);
    const selected = playNotesArray[i] === selected_;
    const stateName = playNotesArray[i];
    const previewName = getUnicodeForPlayNotes(playNotesArray[i]);
    array.push({ name, default: defaultVar, selected, previewName, stateName });
  }
  return array;
}

function getMeasureTopSelectorValues(
  beatArray: Array<BeatsPerBar>,
  default_: BeatsPerBar,
  selected_: BeatsPerBar
) {
  const array = [];
  for (let i = 0; i < beatArray.length; i++) {
    const name = beatArray[i];
    const defaultVar = beatArray[i] === default_;
    const selected = beatArray[i] === selected_;
    const stateName = beatArray[i];
    array.push({ name, default: defaultVar, selected, stateName });
  }
  return array;
}

function getMeasureBottomSelectorValues(
  divisionArray: Array<MeasureDivision>,
  default_: MeasureDivision,
  selected_: MeasureDivision
) {
  const array = [];
  for (let i = 0; i < divisionArray.length; i++) {
    const name = divisionArray[i];
    const defaultVar = divisionArray[i] === default_;
    const selected = divisionArray[i] === selected_;
    const stateName = divisionArray[i];
    array.push({ name, default: defaultVar, selected, stateName });
  }
  return array;
}
