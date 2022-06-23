import { MeasureDivision } from '../consts/measureDivisions';
import { PlayNotes } from '../consts/playNotes';
import assertUnreachable from './assertUnreachable';

export type PlayNotesNumber = MeasureDivision | '1';
export function getUnicodeForPlayNotes(playNotes: PlayNotes) {
  switch (playNotes) {
    case 'firstNoteOnly':
      return '1\u{02E2}\u{1D57}';
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
    case 'firstNoteOnly':
      return 'First Note Only';
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

export function getPlayNotesByNumber(playNotesNumber: PlayNotesNumber): PlayNotes {
  switch (playNotesNumber) {
    case '1':
      return 'wholeNotes';
    case '2':
      return 'halfNotes';
    case '4':
      return 'quarterNotes';
    case '8':
      return 'eighthNotes';
    case '16':
      return 'sixteenthNotes';
    default:
      return assertUnreachable(playNotesNumber);
  }
}
