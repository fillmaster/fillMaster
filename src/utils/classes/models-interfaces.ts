import { BeatsPerBar } from "../../consts/beatsPerBar";
import { PlayNotes } from "../../consts/playNotes";
import { TimeSignature } from "./patternMaker";

export type SubBeatPosition = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';

export enum MetronomeSounds {
	MetronomeSoundOff = '0',
	MetronomeSoundHi = '1',
	MetronomeSoundLo = '2',
	MetronomeSoundFill = '3'
}

export interface IPatternSettings {
	playNotes: PlayNotes;
	timeSignature: TimeSignature;
}

export type BeatPosition = BeatsPerBar;

export type PlayFillOn = { beat: BeatPosition; subBeat: SubBeatPosition };

// Kept as union of numbers instead of strings as this will never be set by the UI directly.
// This is only used for calculations and will not be directly part of a metronomeString.
export type SubDivision = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;