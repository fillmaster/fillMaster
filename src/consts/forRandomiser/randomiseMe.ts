// RANDOMISE_ME array is converted to a Type. Array is needed so all types can be reset even
// if this extends in the future over which, which is why a union type is not made directly.

export const RANDOMISE_ME = ['beatIdea', 'startFill', 'fill', 'tempo'] as const;
type RandomiseMeType = typeof RANDOMISE_ME;
export type RandomiseMe = RandomiseMeType[number];
