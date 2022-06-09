// PLAY_NOTES array is converted to a Type. Array is needed to iterate over which
// is why a union type is not made directly.
export const PLAY_NOTES = [
  'firstNoteOnly',
  'halfNotes',
  'quarterNotes',
  'eighthNotes',
  'sixteenthNotes',
] as const;

type PlayNotesType = typeof PLAY_NOTES;
export type PlayNotes = PlayNotesType[number];

export function getUnicodeForPlayNote(playNotes: PlayNotes) {
  switch (playNotes) {
    case 'firstNoteOnly':
      return 'x';
    case 'halfNotes':
      return 'y';
    case 'quarterNotes':
      return 'q';
    case 'sixteenthNotes':
      return 'w';
    default:
      return 'quarterNotes';
  }
}
