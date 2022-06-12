// PLAY_NOTES array is converted to a Type. Array is needed to iterate over which

import assertUnreachable from '../utils/assertUnreachable';
import { MeasureDivision } from './measureDivisions';

// is why a union type is not made directly.
export const PLAY_NOTES = [
  'wholeNotes',
  'halfNotes',
  'quarterNotes',
  'eighthNotes',
  'sixteenthNotes',
] as const;

type PlayNotesType = typeof PLAY_NOTES;
export type PlayNotes = PlayNotesType[number];

export function getUnicodeForPlayNotes(playNotes: PlayNotes) {
  switch (playNotes) {
    case 'wholeNotes':
      return '\u{1D15D}';
    case 'halfNotes':
      return '\u{1D15E}';
    case 'quarterNotes':
      return '\u{1D15F}';
    case 'eighthNotes':
      return '\u{1D160}';
    case 'sixteenthNotes':
      return '\u{1D161}';
    default:
      return assertUnreachable(playNotes);
  }
}

export function getNamesForPlayNotes(playNotes: PlayNotes) {
  switch (playNotes) {
    case 'wholeNotes':
      return 'Whole Notes';
    case 'halfNotes':
      return 'Half Notes';
    case 'quarterNotes':
      return 'Quarter Notes';
    case 'eighthNotes':
      return 'Eighth Notes';
    case 'sixteenthNotes':
      return 'Sixteenth Notes';
    default:
      return assertUnreachable(playNotes);
  }
}

export function getPlayNotesByMeasureDivision(measureDivision: MeasureDivision): PlayNotes {
  switch (measureDivision) {
    case '2':
      return 'halfNotes';
    case '4':
      return 'quarterNotes';
    case '8':
      return 'eighthNotes';
    case '16':
      return 'sixteenthNotes';
    default:
      return assertUnreachable(measureDivision);
  }
}
