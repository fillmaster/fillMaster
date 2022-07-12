import { IPatternSettings, MetronomeSounds, SubDivision } from "./models-interfaces";
import { Pattern } from "./pattern";
import { getBlankString, getIndexForFillCharacter, getNth, replaceCharacter, replaceEachNthChar } from "./patternUtils";

export class PatternFactory extends Pattern {

	private subDivision: SubDivision;

	constructor(patternSettings?: IPatternSettings, subDivision: SubDivision = 8) {
		super(patternSettings);
		this.subDivision = subDivision;
	}

	getMetronomeStringWithFill(): string {
		const { beat, subBeat } = this.getPatternSettings().playFillOn;
    const metronomeString = this.createMetronomeString();
    const fillIndex = getIndexForFillCharacter(beat, this.subDivision, subBeat);
    const metronomeFillString = replaceCharacter(
      metronomeString,
      fillIndex,
      MetronomeSounds.MetronomeSoundFill
    );
    return metronomeFillString;
	}

	private createMetronomeString({ isCountIn } = { isCountIn: false }) {
    let metronomeSubDivisionSound = MetronomeSounds.MetronomeSoundLo;
    let metronomeFirstNoteSound = MetronomeSounds.MetronomeSoundHi;

    if (isCountIn) {
      metronomeSubDivisionSound = MetronomeSounds.MetronomeSoundHi; // countIn and Hi have same values so reusing
      metronomeFirstNoteSound = MetronomeSounds.MetronomeSoundHi;
    }

    const blankString = getBlankString(
      this.getPatternSettings().timeSignature.beats,
      this.subDivision,
      MetronomeSounds.MetronomeSoundOff
    );

    let stringWithDivisions = blankString;
    const nth = getNth(
      this.getPatternSettings().playNotes,
      this.subDivision,
      this.getPatternSettings().timeSignature.division,
      isCountIn
    );
    if (nth !== null) {
      stringWithDivisions = replaceEachNthChar(blankString, nth, metronomeSubDivisionSound);
    }

    // replace first character with the first note sound.
    const metronomeString = replaceCharacter(stringWithDivisions, 0, metronomeFirstNoteSound);
    return metronomeString;
  }
}
