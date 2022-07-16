import { IPatternSettings, MetronomeSounds, SubDivision } from './models-interfaces';
import Pattern from './pattern';
import { PlayFillOn } from './patternMaker';
import {
  getBlankString,
  getIndexForFillCharacter,
  getNth,
  replaceCharacter,
  replaceEachNthChar,
} from './patternUtils';

class MetronomePattern extends Pattern {
  private playFillOn: PlayFillOn;

  private subDivision: SubDivision;

  private static instance: MetronomePattern;

  constructor(
    playFillOn: PlayFillOn,
    subDivision: SubDivision,
    patternSettings?: IPatternSettings
  ) {
    super(patternSettings);
    this.playFillOn = playFillOn;
    this.subDivision = subDivision;
  }

  public static getInstance(
    patternSettings?: IPatternSettings,
    playFillOn: PlayFillOn = { beat: '3', subBeat: '0' },
    subDivision: SubDivision = 8
  ): MetronomePattern {
    if (!MetronomePattern.instance) {
      MetronomePattern.instance = new MetronomePattern(playFillOn, subDivision, patternSettings);
    }

    return MetronomePattern.instance;
  }

  getMetronomeStringWithFill(): string {
    const { beat, subBeat } = this.playFillOn;

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

export default MetronomePattern;
