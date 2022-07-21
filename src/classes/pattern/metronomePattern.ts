import { IPatternHelperSettings, MetronomeSounds, PlayHelperOn } from './models-interfaces';
import Pattern from './pattern';
import {
  getBlankString,
  getIndexForFillCharacter,
  getNth,
  replaceCharacter,
  replaceEachNthChar,
} from './patternUtils';

class MetronomePattern extends Pattern {
  private static instance: MetronomePattern;

  private playHelperOn: PlayHelperOn = { beat: '2', subBeat: '0' };

  // constructor is necessary to keep it private
  private constructor(patternSettings?: IPatternHelperSettings, playHelperOn?: PlayHelperOn) {
    super(patternSettings);
    this.playHelperOn = playHelperOn
      ? { ...this.getDefaultPlayHelperOn(), ...playHelperOn }
      : this.getDefaultPlayHelperOn();
  }

  public static getInstance(
    patternSettings?: IPatternHelperSettings,
    playHelperOn?: PlayHelperOn
  ): MetronomePattern {
    if (!MetronomePattern.instance) {
      MetronomePattern.instance = new MetronomePattern(patternSettings, playHelperOn);
    }
    return MetronomePattern.instance;
  }

  public getDefaultPlayHelperOn(): PlayHelperOn {
    return { ...this.playHelperOn };
  }

  public getMetronomeStringWithFill(): string {
    const { beat, subBeat } = this.playHelperOn;

    const metronomeString = this.createMetronomeString();
    const fillIndex = getIndexForFillCharacter(beat, this.subDivision, subBeat);
    const metronomeFillString = replaceCharacter(
      metronomeString,
      fillIndex,
      MetronomeSounds.MetronomeSoundFill
    );
    return metronomeFillString;
  }

  public setPlayHelperOn(playHelperOn: PlayHelperOn): void {
    this.playHelperOn = playHelperOn;
  }

  public getMetronomeString = () => {
    return this.createMetronomeString();
  };

  public getMetronomeCountInString = () => {
    return this.createMetronomeString({ isCountIn: true });
  };

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
