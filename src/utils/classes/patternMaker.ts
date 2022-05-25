export type PlayNotes =
  | 'firstNoteOnly'
  | 'halfNotes'
  | 'quarterNotes'
  | 'eighthNotes'
  | 'sixteenthNotes';

export type PlayFillOn = { beat: BeatPosition; subBeat: SubBeatPosition };

// Kept as union of numbers instead of strings as this will never be set by the UI directly.
// This is only used for calculations and will not be directly part of a metronomeString.
type Subdivision = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type SubBeatPosition = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

type BeatsPerBar =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16';

export type BeatPosition = BeatsPerBar;

type MetronomeSound = '0' | '1' | '2' | '3';

interface PatternSettings {
  playNotes: PlayNotes;
  playFillOn: PlayFillOn;
  beatsPerBar: BeatsPerBar;
}

export default class PatternMaker {
  private metronomeSoundOff: MetronomeSound = '0';

  private metronomeSoundHi: MetronomeSound = '1';

  private metronomeSoundLo: MetronomeSound = '2';

  private metronomeSoundFill: MetronomeSound = '3';

  private metronomeSoundCountIn: MetronomeSound = '1';

  private subDivision: Subdivision = 4;

  // private beatsPerBar: BeatsPerBar = '4';

  private defaultSettingsForPattern: PatternSettings;

  private customSettingsForPattern: PatternSettings;

  // SINGLETON. PatternMaker can only be instantiated once,
  // by using 'PatternMaker.getInstance();'.
  private static instance: PatternMaker;

  private constructor() {
    this.defaultSettingsForPattern = {
      playNotes: 'quarterNotes',
      playFillOn: { beat: '4', subBeat: '0' },
      beatsPerBar: '4',
    };
    this.customSettingsForPattern = this.defaultSettingsForPattern;
  }

  public static getInstance(): PatternMaker {
    if (!PatternMaker.instance) {
      PatternMaker.instance = new PatternMaker();
    }

    return PatternMaker.instance;
  }
  // END OF SINGLETON.

  public setCustomSettingsForPattern = (patternSettings: PatternSettings) => {
    this.customSettingsForPattern = patternSettings;
  };

  public setCustomSettingsForPatternToDefault = () => {
    this.customSettingsForPattern = this.defaultSettingsForPattern;
  };

  public getCustomSettingsForPattern = () => {
    return this.customSettingsForPattern;
  };

  public getMetronomeStringWithFill = () => {
    const { beat, subBeat } = this.customSettingsForPattern.playFillOn;
    const metronomeString = this.createMetronomeString();
    const fillIndex = getIndexForFillCharacter(beat, this.subDivision, subBeat);
    const metronomeFillString = replaceCharacter(
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

    const blankString = getBlankString(
      this.customSettingsForPattern.beatsPerBar,
      this.subDivision,
      this.metronomeSoundOff
    );

    let stringWithDivisions = blankString;
    const nth = getNth(this.customSettingsForPattern.playNotes, this.subDivision);
    if (nth !== null) {
      stringWithDivisions = replaceEachNthChar(blankString, nth, metronomeSubDivisionSound);
    }

    // replace first character with the first note sound.
    const metronomeString = replaceCharacter(stringWithDivisions, 0, metronomeFirstNoteSound);
    return metronomeString;
  }
}

// returns an index to use with replaceCharacter for the fill start.
function getIndexForFillCharacter(
  beat_: BeatPosition,
  division: Subdivision,
  subBeat_: SubBeatPosition
) {
  const beat = Number(beat_);
  const subBeat = Number(subBeat_);
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
function getBlankString(beatsPerBar_: BeatsPerBar, subDivision: number, character: MetronomeSound) {
  const beatsPerBar = Number(beatsPerBar_);
  const multiplier = beatsPerBar * subDivision;
  return character.repeat(multiplier);
}
