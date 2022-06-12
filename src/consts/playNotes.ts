// PLAY_NOTES array is converted to a Type. Array is needed to iterate over which
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
