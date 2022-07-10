import { BeatsPerBar } from '../constsants/beatsPerBar';
import { MeasureDivision, MEASURE_DIVISIONS } from '../constsants/measureDivisions';
import { getPlayNotesByNumber, PlayNotesNumber } from './playNotesFunctions';

const getAvailablePlayNotes = (beatsPerBar_: BeatsPerBar, division_: MeasureDivision) => {
  const array = getPlayNotesNumbers(beatsPerBar_, division_);
  const newArray = array.map((x) => getPlayNotesByNumber(x as PlayNotesNumber));
  if ((Number(beatsPerBar_) / Number(division_)) * Number(array[0]) !== 1)
    newArray.unshift('firstNoteOnly');
  return newArray;
};

const getPlayNotesNumbers = (beatsPerBar_: BeatsPerBar, division_: MeasureDivision) => {
  const lower = getLowerNotes(beatsPerBar_, division_);
  const higher = getHigherNotes(division_);
  return [...lower, ...higher] as PlayNotesNumber[];
};

const getLowerNotes = (beatsPerBar: BeatsPerBar, division: MeasureDivision) => {
  const divisions = ['1', ...MEASURE_DIVISIONS];
  const divisionIndex = divisions.findIndex((div) => div === division);
  const newArray = [];
  for (let i = 0; i <= divisionIndex; i++) {
    const rule = Number(division) / Number(divisions[i]);
    const quotient = Math.floor(Number(beatsPerBar) / rule);
    const remainder = Number(beatsPerBar) % rule;
    if (remainder === 0 && quotient >= 1) newArray.push(divisions[i]);
  }
  return newArray;
};

const getHigherNotes = (division: MeasureDivision) => {
  const array = [...MEASURE_DIVISIONS];
  const newArray = array.filter((x) => Number(x) > Number(division));
  return newArray;
};

export default getAvailablePlayNotes;
