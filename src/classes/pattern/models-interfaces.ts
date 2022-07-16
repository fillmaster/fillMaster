import { BeatsPerBar } from '../../consts/beatsPerBar';
import { MeasureDivision } from '../../consts/measureDivisions';
import { PlayNotes } from '../../consts/playNotes';

export type SubBeatPosition = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';

export enum MetronomeSounds {
  MetronomeSoundOff = '0',
  MetronomeSoundHi = '1',
  MetronomeSoundLo = '2',
  MetronomeSoundFill = '3',
}

export interface IPatternSettings {
  playNotes: PlayNotes;
  timeSignature: TimeSignature;
}
export interface IPatternHelperSettings extends IPatternSettings {
  playHelperOn: PlayHelperOn;
}

export type TimeSignature = { beats: BeatsPerBar; division: MeasureDivision };

export type BeatPosition = BeatsPerBar;

export type PlayHelperOn = { beat: BeatPosition; subBeat: SubBeatPosition };

// Kept as union of numbers instead of strings as this will never be set by the UI directly.
// This is only used for calculations and will not be directly part of a metronomeString.
export type SubDivision = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const DEFAULT_TIME_SIGNATURE: TimeSignature = {
  beats: '4',
  division: '4',
};
