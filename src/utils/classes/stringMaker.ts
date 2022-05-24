export type PlayNotes = 'firstNoteOnly' | 'quarterNotes' | 'eighthNotes' | 'sixteenthNotes';
export type PlayFillOn = '1' | '2' | '3' | '4';

interface PatternSettings {
  playNotes: PlayNotes;
  playFillOn: PlayFillOn;
}

// this class is for 4/4 only
export default class PatternMaker {
  private defaultSettingsForPattern: PatternSettings;

  private customSettingsForPattern: PatternSettings;

  private metronomeString!: string;

  private metronomeStringWithFill!: string;

  public countInString: string;

  // The following code makes this class a singleton. PatternMaker can only be instantiated once, by using 'PatternMaker.getInstance();'.
  // Cannot call new PatternMaker() - the following eslint error is incorrect.
  // eslint-disable-next-line no-use-before-define
  private static instance: PatternMaker;

  private constructor() {
    this.defaultSettingsForPattern = {
      playNotes: 'quarterNotes',
      playFillOn: '4',
    };
    this.customSettingsForPattern = this.defaultSettingsForPattern;
    this.setMetronomeStrings(this.defaultSettingsForPattern);
    this.countInString = '1000100010001000';
  }

  public static getInstance(): PatternMaker {
    if (!PatternMaker.instance) {
      PatternMaker.instance = new PatternMaker();
    }

    return PatternMaker.instance;
  }
  // end of singleton.

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

  private createFillString = (startFillAtNoteNumber: number) => {
    const rhythmArray = this.metronomeString.split('');
    rhythmArray[startFillAtNoteNumber - 1] = '3';
    this.metronomeStringWithFill = rhythmArray.join('');
  };

  private setRhythmStringWithFill = (patternSettings: PatternSettings) => {
    switch (patternSettings.playFillOn) {
      // eventually add 1e, 1& up to 4a
      case '1':
        this.createFillString(1);
        break;
      case '2':
        this.createFillString(5);
        break;
      case '3':
        this.createFillString(9);
        break;
      case '4':
        this.createFillString(13);
        break;
      default:
        break;
    }
  };

  public setCustomSettingsForPatternToDefault = () => {
    this.customSettingsForPattern = this.defaultSettingsForPattern;
    this.setMetronomeStrings(this.customSettingsForPattern);
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
