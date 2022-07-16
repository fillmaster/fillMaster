import { BeatsPerBar } from "../../consts/beatsPerBar";
import { MeasureDivision } from "../../consts/measureDivisions";
import { PlayNotes } from "../../consts/playNotes";
import assertUnreachable from "../assertUnreachable";
import { getPlayNotesByNumber } from "../playNotesFunctions";
import { MetronomeSounds, SubBeatPosition, SubDivision } from "./models-interfaces";


export function getIndexForFillCharacter(b: BeatsPerBar, subDivison: SubDivision, sb: SubBeatPosition): number {
	const beat = Number(b);
	const subBeat = Number(sb);
	let output = 0;
	for (let i = 1; i < beat; i++) {
		output += subDivison;
	}
	return output + subBeat;
}

// replaces a character in a string at a given index.
export function replaceCharacter(str: string, index: number, replaceWith: MetronomeSounds): string {
	const stringAsArray = str.split('');
	stringAsArray[index] = replaceWith;
	return stringAsArray.join('');
}

// replaces a blank metronome string with a character (e.g. '2') every nth number of characters.
// starts at the correct position for the first sub division, i.e. does not include the first character.
export function replaceEachNthChar(str: string, nth: number, replaceWith: MetronomeSounds): string {
	const stringAsArray = str.split('');
	for (let i = nth; i < str.length; i += nth) {
		stringAsArray[i] = replaceWith;
	}
	return stringAsArray.join('');
}

export function getNth(
	playNotes_: PlayNotes,
	subDivision: SubDivision,
	division_: MeasureDivision,
	isCountIn: boolean = false
): number | null {
	let nth: number | null;
	const division = Number(division_);
	let playNotes = playNotes_;
	if (isCountIn) playNotes = getPlayNotesByNumber(division_);
	switch (playNotes) {
		case 'firstNoteOnly':
			nth = null;
			break;
		case 'wholeNotes':
			nth = subDivision * division;
			break;
		case 'halfNotes':
			nth = subDivision * (division / 2);
			break;
		case 'quarterNotes':
			nth = subDivision * (division / 4);
			break;
		case 'eighthNotes':
			nth = subDivision * (division / 8);
			break;
		case 'sixteenthNotes':
			nth = subDivision * (division / 16);
			break;
		default:
			assertUnreachable(playNotes);
	}
	return nth;
}
// returns a blank metronome string of the correct length, depending on the number of beat plus subdivisions
export function getBlankString(beatsPerBar_: BeatsPerBar, subDivision: number, character: MetronomeSounds): string {
	const beatsPerBar = Number(beatsPerBar_);
	const multiplier = beatsPerBar * subDivision;
	return character.repeat(multiplier);
}