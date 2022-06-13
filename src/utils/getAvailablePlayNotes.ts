import { BeatsPerBar } from '../consts/beatsPerBar';
import { MeasureDivision, MEASURE_DIVISIONS } from '../consts/measureDivisions';
import { getPlayNotesByMeasureDivision } from './playNotesFunctions';
import { stringToNumArray } from './stringNumConvert';

// Not a great name, but this is needed for calculations. 1 is needed to include whole notes
// and it must go up to the maximum number of the note division type (e.g. 16)
type OneToMaxDivision = MeasureDivision | '1';

const getAvailablePlayNotes = (beatsPerBar_: BeatsPerBar, division_: MeasureDivision) => {
  const array = getPlayNotesNumbers(beatsPerBar_, division_);
  const newArray = array.map((x) => getPlayNotesByMeasureDivision(x as OneToMaxDivision));
  return newArray;
};

const getPlayNotesNumbers = (beatsPerBar_: BeatsPerBar, division_: MeasureDivision) => {
  const lower = getLowerNotes(beatsPerBar_, division_);
  const higher = getHigherNotes(division_);
  return [...lower, ...higher];
};

const getLowerNotes = (beatsPerBar_: BeatsPerBar, division_: MeasureDivision) => {
  const divisions = stringToNumArray(['1', ...MEASURE_DIVISIONS]);
  const division = Number(division_);
  const beatsPerBar = Number(beatsPerBar_);
  const divisionIndex = divisions.findIndex((div) => div === division);
  const newArray = [];
  for (let i = 0; i <= divisionIndex; i++) {
    const rule = division / divisions[i];
    const quotient = Math.floor(beatsPerBar / rule);
    const remainder = beatsPerBar % rule;
    if (remainder === 0 && quotient >= 1) newArray.push(divisions[i].toString());
  }
  return newArray;
};

const getHigherNotes = (division: MeasureDivision) => {
  const array = [...MEASURE_DIVISIONS];
  const newArray = array.filter((x) => Number(x) > Number(division));
  return newArray;
};

export default getAvailablePlayNotes;