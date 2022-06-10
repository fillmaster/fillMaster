import { MeasureDivision } from '../consts/measureDivisions';
import {
  getNamesForPlayNotes,
  getPlayNotesByMeasureDivision,
  getUnicodeForPlayNotes,
  PlayNotes,
  PLAY_NOTES,
} from '../consts/playNotes';
import PatternMaker from '../utils/classes/patternMaker';
import NoteDivisionSelector from './elements/NoteDivisionSelector';

interface SelectorsProps {
  timeSignatureBottom: MeasureDivision;
  patternMaker: PatternMaker;
  isCountIn: () => boolean;
  handleSetNoteDivision: (division: string) => void;
}
const Selectors = ({
  timeSignatureBottom,
  patternMaker,
  isCountIn,
  handleSetNoteDivision,
}: SelectorsProps) => {
  return (
    <NoteDivisionSelector
      selectorItems={getPlayNoteValues(
        [...PLAY_NOTES],
        timeSignatureBottom as MeasureDivision,
        patternMaker.getCustomSettingsForPattern().playNotes
      )}
      handleSetItem={handleSetNoteDivision}
      disabled={isCountIn()}
    />
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
