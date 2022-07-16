import { IPatternHelperSettings, MetronomeSounds } from './models-interfaces';
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

  // https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
  public override patternSettings!: IPatternHelperSettings;

  protected override defaultPatternSettings: IPatternHelperSettings = {
    playNotes: 'quarterNotes',
    timeSignature: { beats: '4', division: '4' },
    playHelperOn: { beat: '3', subBeat: '0' },
  };

  // constructor is necessary to keep it private
  private constructor(patternSettings?: IPatternHelperSettings) {
    super(patternSettings);
  }

  public static getInstance(patternSettings?: IPatternHelperSettings): MetronomePattern {
    if (!MetronomePattern.instance) {
      MetronomePattern.instance = new MetronomePattern(patternSettings);
    }
    return MetronomePattern.instance;
  }

  getMetronomeStringWithFill(): string {
    const { beat, subBeat } = this.patternSettings.playHelperOn;

    const metronomeString = this.createMetronomeString();
    const fillIndex = getIndexForFillCharacter(beat, this.subDivision, subBeat);
    const metronomeFillString = replaceCharacter(
      metronomeString,
      fillIndex,
      MetronomeSounds.MetronomeSoundFill
    );
    return metronomeFillString;
  }

  setPatternSettings(patternSettings: IPatternHelperSettings): void {
    this.patternSettings = patternSettings;
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
