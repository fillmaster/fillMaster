import { useEffect, useState } from 'react';
import { BeatsPerBar, BEATS_PER_BAR } from '../consts/beatsPerBar';
import { MeasureDivision, MEASURE_DIVISIONS } from '../consts/measureDivisions';
import { PlayNotes, PLAY_NOTES } from '../consts/playNotes';
import PatternMaker from '../utils/classes/patternMaker';
import {
  getNamesForPlayNotes,
  getPlayNotesByMeasureDivision,
  getUnicodeForPlayNotes,
} from '../utils/playNotesFunctions';
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
          selectorItems={getMeasureTopSelectorOptions(
            [...BEATS_PER_BAR],
            '4',
            patternMaker.getCustomSettingsForPattern().timeSignature.beats
          )}
          handleSetItem={handleSetTimeSignatureTop}
          disabled={isCountIn()}
        />
        <MeasureBottomSelector
          selectorItems={getMeasureBottomSelectorOptions(
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
        selectorItems={getPlayNotesOptions(
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

function getPlayNotesOptions(
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

function getMeasureTopSelectorOptions(
  beatsPerBars: Array<BeatsPerBar>,
  default_: BeatsPerBar,
  selected_: BeatsPerBar
) {
  const beatsPerBarSelectorOptions = [];
  for (let i = 0; i < beatsPerBars.length; i++) {
    const name = beatsPerBars[i];
    const defaultVar = beatsPerBars[i] === default_;
    const selected = beatsPerBars[i] === selected_;
    const stateName = beatsPerBars[i];
    beatsPerBarSelectorOptions.push({ name, default: defaultVar, selected, stateName });
  }
  return beatsPerBarSelectorOptions;
}

function getMeasureBottomSelectorOptions(
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
