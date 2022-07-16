// BEATS_PER_BAR array is converted to a Type. Array is needed to iterate over which
// is why a union type is not made directly.
export const BEATS_PER_BAR = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
] as const;
type BeatsPerBarType = typeof BEATS_PER_BAR;
export type BeatsPerBar = BeatsPerBarType[number];
