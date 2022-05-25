export type PlayNotes =
  | 'firstNoteOnly'
  | 'halfNotes'
  | 'quarterNotes'
  | 'eighthNotes'
  | 'sixteenthNotes';

export type PlayFillOn = '1' | '2' | '3' | '4';

type Subdivision = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type SubBeat = Subdivision | 0;

type BeatsPerBar = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

type MetronomeSound = '0' | '1' | '2' | '3';

interface PatternSettings {
  playNotes: PlayNotes;
  playFillOn: PlayFillOn;
}

export default class PatternMaker {
  private metronomeSoundOff: MetronomeSound = '0';

  private metronomeSoundHi: MetronomeSound = '1';

  private metronomeSoundLo: MetronomeSound = '2';

  private metronomeSoundFill: MetronomeSound = '3';

  private metronomeSoundCountIn: MetronomeSound = '1';

  private subDivision: Subdivision = 4;

  private beatsPerBar: BeatsPerBar = 4;

  private defaultSettingsForPattern: PatternSettings;

  private settingsForPattern: PatternSettings;

  // SINGLETON. PatternMaker can only be instantiated once,
  // by using 'PatternMaker.getInstance();'.
  private static instance: PatternMaker;

  private constructor() {
    this.defaultSettingsForPattern = {
      playNotes: 'quarterNotes',
      playFillOn: '4',
    };
    this.settingsForPattern = this.defaultSettingsForPattern;
  }

  public static getInstance(): PatternMaker {
    if (!PatternMaker.instance) {
      PatternMaker.instance = new PatternMaker();
    }

    return PatternMaker.instance;
  }
  // END OF SINGLETON.

  public setSettingsForPattern = (patternSettings: PatternSettings) => {
    this.settingsForPattern = patternSettings;
  };

  public getMetronomeFillString = (beat: BeatsPerBar, subBeat: SubBeat) => {
    if (beat < 1) {
      throw new Error('Beat must be 1 or higher');
    }
    if (subBeat < 0) {
      throw new Error('subBeat must be 0 or higher');
    }
    if (beat > this.beatsPerBar) {
      throw new Error('Cannot put a fill on a beat number higher than beatsPerBar');
    }
    if (subBeat > this.subDivision - 1) {
      throw new Error('subBeat must be no greater than the current subDivision - 1');
    }
    const metronomeString = this.createMetronomeString();
    const fillIndex = getIndexForFillCharacter(beat, this.subDivision, subBeat);
    const metronomeFillString = replaceEachNthChar(
      metronomeString,
      fillIndex,
      this.metronomeSoundFill
    );
    return metronomeFillString;
  };

  public getMetronomeString = () => {
    return this.createMetronomeString();
  };

  public getMetronomeCountInString = () => {
    return this.createMetronomeString({ isCountIn: true });
  };

  private createMetronomeString({ isCountIn } = { isCountIn: false }) {
    let metronomeSubDivisionSound = this.metronomeSoundLo;
    let metronomeFirstNoteSound = this.metronomeSoundHi;

    if (isCountIn) {
      metronomeSubDivisionSound = this.metronomeSoundCountIn;
      metronomeFirstNoteSound = this.metronomeSoundCountIn;
    }

    const blankString = getBlankString(this.beatsPerBar, this.subDivision, this.metronomeSoundOff);

    let stringWithDivisions = blankString;
    const nth = getNth(this.settingsForPattern.playNotes, this.subDivision);
    if (nth !== null) {
      stringWithDivisions = replaceEachNthChar(blankString, nth, metronomeSubDivisionSound);
    }

    // replace first character with the first note sound.
    const metronomeString = replaceCharacter(stringWithDivisions, 0, metronomeFirstNoteSound);
    return metronomeString;
  }
}

// returns an index to use with replaceCharacter for the fill start.
function getIndexForFillCharacter(beat: BeatsPerBar, division: Subdivision, subBeat: SubBeat) {
  let output = 0;
  for (let i = 1; i < beat; i++) {
    output += division;
  }
  return output + subBeat;
}

function replaceCharacter(str: string, index: number, replaceWith: MetronomeSound) {
  const stringAsArray = str.split('');
  stringAsArray[index] = replaceWith;
  return stringAsArray.join('');
}

// replaces a blank metronome string with a character (e.g. '2') every nth number of characters.
// starts at the correct position for the first sub division, i.e. does not include the first character.
function replaceEachNthChar(str: string, nth: number, replaceWith: MetronomeSound) {
  const stringAsArray = str.split('');
  for (let i = nth; i < str.length; i += nth) {
    stringAsArray[i] = replaceWith;
  }
  return stringAsArray.join('');
}

function getNth(playNotes: PlayNotes, subDivision: number) {
  let nth: number | null;
  switch (playNotes) {
    case 'firstNoteOnly':
      nth = null;
      break;
    case 'halfNotes':
      nth = subDivision * 2;
      break;
    case 'quarterNotes':
      nth = subDivision * 1;
      break;
    case 'eighthNotes':
      nth = subDivision / 2;
      break;
    case 'sixteenthNotes':
      nth = subDivision / 4;
      break;
    default:
      nth = null;
  }
  return nth;
}
// returns a blank metronome string of the correct length, depending on the number of beat plus subdivisions
function getBlankString(beatsPerBar: number, subDivision: number, character: MetronomeSound) {
  const multiplier = beatsPerBar * subDivision;
  return character.repeat(multiplier);
}
