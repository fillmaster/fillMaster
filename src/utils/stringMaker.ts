export type PlayNotes = 'firstNoteOnly' | 'quarterNotes' | 'eighthNotes' | 'sixteenthNotes';
export type PlayFillOn = '1' | '2' | '3' | '4';

interface PatternSettings {
  playNotes: PlayNotes;
  playFillOn: PlayFillOn;
}

// this class is for 4/4
export default class PatternMaker {
  // This is a 'hack' to create a Singleton so that only one PatternMaker is instantiated, eslint
  // is incorrect here.
  // eslint-disable-next-line no-use-before-define
  private static instance: PatternMaker;

  private defaultSettingsForPattern: PatternSettings;

  private customSettingsForPattern: PatternSettings;

  private metronomeString!: string;

  private metronomeStringWithFill!: string;

  private constructor() {
    this.defaultSettingsForPattern = {
      playNotes: 'quarterNotes',
      playFillOn: '4',
    };
    this.customSettingsForPattern = this.defaultSettingsForPattern;
    this.setMetronomeStrings(this.defaultSettingsForPattern);
  }

  // Part of singleton 'hack'.
  public static getInstance(): PatternMaker {
    if (!PatternMaker.instance) {
      PatternMaker.instance = new PatternMaker();
    }

    return PatternMaker.instance;
  }

  public setCustomSettingsForPattern = (patternSettings: PatternSettings) => {
    this.customSettingsForPattern = patternSettings;
    this.setMetronomeStrings(patternSettings);
  };

  public setMetronomeStrings = (patternSettings: PatternSettings) => {
    // set final metronome string based on custom or default settings

    let rhythmString: string;
    switch (patternSettings.playNotes) {
      case 'firstNoteOnly':
        rhythmString = '1000000000000000';
        break;
      case 'quarterNotes':
        rhythmString = '1000200020002000';
        break;
      case 'eighthNotes':
        rhythmString = '1020202020202020';
        break;
      case 'sixteenthNotes':
        rhythmString = '1222222222222222';
        break;
      default:
        rhythmString = '1000100010001000'; // not DRY as repeated on Metronome.tsx
    }
    this.metronomeString = rhythmString;
    this.metronomeStringWithFill = rhythmString;
    this.setRhythmStringWithFill(patternSettings);
  };

  private setFillStringWith = (startFillAtNoteNumber: number) => {
    const rhythmArray = this.metronomeString.split('');
    rhythmArray[startFillAtNoteNumber - 1] = '3';
    this.metronomeStringWithFill = rhythmArray.join('');
  };

  private setRhythmStringWithFill = (patternSettings: PatternSettings) => {
    switch (patternSettings.playFillOn) {
      // eventually add 1e, 1& up to 4a
      case '1':
        this.setFillStringWith(1);
        break;
      case '2':
        this.setFillStringWith(5);
        break;
      case '3':
        this.setFillStringWith(9);
        break;
      case '4':
        this.setFillStringWith(13);
        break;
      default:
        break;
    }
  };

  public setCustomSettingsForPatternToDefault = () => {
    this.customSettingsForPattern = this.defaultSettingsForPattern;
    this.setMetronomeStrings(this.customSettingsForPattern);
    // this.setRhythmStringWithFill(this.customSettingsForPattern)
  };

  public getMetronomeString = () => {
    return this.metronomeString;
  };

  public getMetronomeStringWithFill = () => {
    return this.metronomeStringWithFill;
  };

  public getCustomSettingsForPattern = () => {
    return this.customSettingsForPattern;
  };
}
