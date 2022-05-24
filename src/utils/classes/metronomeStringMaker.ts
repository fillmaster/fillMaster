export type PlayNotes = {
  firstNoteOnly: null;
  halfNotes: number;
  quarterNotes: number;
  eighthNotes: number;
  sixteenthNotes: number;
};

export type PlayFillOn = '1' | '2' | '3' | '4';

type metronomeSound = '0' | '1' | '2' | '3';

interface PatternSettings {
  playNotes: PlayNotes;
  playFillOn: PlayFillOn;
}

export default class MetronomeStringMaker {
  private metronomeSoundOff: metronomeSound = '0';

  private metronomeSoundHi: metronomeSound = '1';

  private metronomeSoundLo: metronomeSound = '2';

  private metronomeSoundFill: metronomeSound = '3';

  private metronomeSoundCountIn: metronomeSound = '1';

  private subDivision = 4;

  private numberOfBeats = 4;

  private defaultSettingsForPattern: PatternSettings;

  private settingsForPattern: PatternSettings;

  private metronomeString!: string;

  private metronomeStringWithFill!: string;

  public countInString: string;

  private playNotes = {
    firstNoteOnly: null,
    halfNotes: this.subDivision * 2,
    quarterNotes: this.subDivision * 1,
    eighthNotes: this.subDivision / 2,
    sixteenthNotes: this.subDivision / 4,
  };

  // SINGLETON. MetronomeStringMaker can only be instantiated once,
  // by using 'PatternMaker.getInstance();'.
  private static instance: MetronomeStringMaker;

  private constructor() {
    this.defaultSettingsForPattern = {
      playNotes: this.playNotes.quarterNotes,
      playFillOn: '4',
    };
    this.settingsForPattern = this.defaultSettingsForPattern;
    this.countInString = this.createMetronomeString(this.playNotes.quarterNotes);
  }

  public static getInstance(): MetronomeStringMaker {
    if (!MetronomeStringMaker.instance) {
      MetronomeStringMaker.instance = new MetronomeStringMaker();
    }

    return MetronomeStringMaker.instance;
  }
  // END OF SINGLETON.

  public getMetronomeString = () => {
    return this.createMetronomeString(this.settingsForPattern.playNotes);
  };

  private createMetronomeString(playNotes_: number, isCountIn_: boolean = false) {
    let metronomeSubDivisionSound = this.metronomeSoundLo;
    if (isCountIn_) {
      metronomeSubDivisionSound = this.metronomeSoundCountIn;
    }
    const playNotes = Number(playNotes_);
    const blankString = getBlankString(
      this.numberOfBeats,
      this.subDivision,
      this.metronomeSoundOff
    );
    let stringWithDivisions = blankString;
    if (this.settingsForPattern.playNotes !== null) {
      stringWithDivisions = replaceEachNthChar(blankString, playNotes, metronomeSubDivisionSound);
    }
    const metronomeString = replaceCharacter(stringWithDivisions, 0, this.metronomeSoundHi);
    return metronomeString;
  }
}

function replaceCharacter(str: string, index: number, replaceWith: metronomeSound) {
  const stringAsArray = str.split('');
  stringAsArray[index] = replaceWith;
  return stringAsArray.join('');
}

// replaces a blank metronome string with a character (e.g. '2') every nth number of characters.
// starts at the correct position for the first sub division, i.e. does not include the first character.
function replaceEachNthChar(str: string, nth: number, replaceWith: metronomeSound) {
  const stringAsArray = str.split('');
  for (let i = nth; i < str.length; i += nth) {
    stringAsArray[i] = replaceWith;
  }
  return stringAsArray.join('');
}

// returns a blank metronome string of the correct length, depending on the number of beats and subdivisions
function getBlankString(numberOfBeats: number, subDivision: number, character: metronomeSound) {
  const multiplier = numberOfBeats * subDivision;
  return character.repeat(multiplier);
}
