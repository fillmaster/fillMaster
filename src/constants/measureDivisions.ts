// MEASURE_DIVISIONS array is converted to a Type. Array is needed to iterate over which
// is why a union type is not made directly.
export const MEASURE_DIVISIONS = ['2', '4', '8', '16'] as const;
type MeasureDivisionsType = typeof MEASURE_DIVISIONS;
export type MeasureDivision = MeasureDivisionsType[number];
