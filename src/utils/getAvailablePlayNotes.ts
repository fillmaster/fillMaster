import { BeatsPerBar } from '../consts/beatsPerBar';
import { MeasureDivision, MEASURE_DIVISIONS } from '../consts/measureDivisions';
import { PlayNotes } from '../consts/playNotes';
import { stringToNumArray } from './stringNumConvert';

const getAvailablePlayNotes = (beatsPerBar_: BeatsPerBar, division_: MeasureDivision) => {
  const divisions = stringToNumArray([...MEASURE_DIVISIONS, '1']);
  const division = Number(division_);
  const beatsPerBar = Number(beatsPerBar_);

  const newArray: Array<PlayNotes> = [];
  for (let i = 0; i < divisions.length - 1; i++) {
    const rule = division / divisions[i];
    const quotient = Math.floor(beatsPerBar / rule);
    const remainder = Math.floor(beatsPerBar % rule);
    if (remainder === 0 && quotient >= 1) newArray.push(divisions[i].toString() as PlayNotes);
  }
  return newArray;
};

export default getAvailablePlayNotes;
