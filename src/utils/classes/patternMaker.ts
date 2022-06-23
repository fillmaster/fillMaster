import { BeatsPerBar } from '../../consts/beatsPerBar';
import { MeasureDivision } from '../../consts/measureDivisions';
import { PlayNotes } from '../../consts/playNotes';
import assertUnreachable from '../assertUnreachable';
import { getPlayNotesByNumber } from '../playNotesFunctions';

export type PlayFillOn = { beat: BeatPosition; subBeat: SubBeatPosition };

export type TimeSignature = { beats: BeatsPerBar; division: MeasureDivision };

export type BeatPosition = BeatsPerBar; // alias for clarity when choosing fill-start.

// Kept as union of numbers instead of strings as this will never be set by the UI directly.
// This is only used for calculations and will not be directly part of a metronomeString.
type Subdivision = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// based on max subDivisions (8). '0' is on beat.
type SubBeatPosition = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';

type MetronomeSound = '0' | '1' | '2' | '3';

interface PatternSettings {
  playNotes: PlayNotes;
  playFillOn: PlayFillOn;
  timeSignature: TimeSignature;
}

export default class PatternMaker {
  private metronomeSoundOff: MetronomeSound = '0';

  private metronomeSoundHi: MetronomeSound = '1';

  private metronomeSoundLo: MetronomeSound = '2';

  private metronomeSoundFill: MetronomeSound = '3';

  private metronomeSoundCountIn: MetronomeSound = '1';

  private subDivision: Subdivision;

  private defaultSettingsForPattern: PatternSettings;

  private customSettingsForPattern: PatternSettings;

  // SINGLETON. PatternMaker can only be instantiated once,
  // by using 'PatternMaker.getInstance();'.
  private static instance: PatternMaker;

  private constructor(subdivision: Subdivision = 8) {
    this.defaultSettingsForPattern = {
      playNotes: 'quarterNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    };
    this.customSettingsForPattern = this.defaultSettingsForPattern;
    this.subDivision = subdivision;
  }

  public static getInstance(subdivision?: Subdivision): PatternMaker {
    if (!PatternMaker.instance) {
      PatternMaker.instance = new PatternMaker(subdivision);
    }

    return PatternMaker.instance;
  }
  // END OF SINGLETON.

  public setSettings = (patternSettings: PatternSettings) => {
    this.customSettingsForPattern = patternSettings;
  };

  public setSettingsToDefault = () => {
    this.customSettingsForPattern = this.defaultSettingsForPattern;
  };

  public getSettings = () => {
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

  public getSubDivision = () => {
    return this.subDivision;
  };

  private createMetronomeString({ isCountIn } = { isCountIn: false }) {
    let metronomeSubDivisionSound = this.metronomeSoundLo;
    let metronomeFirstNoteSound = this.metronomeSoundHi;

    if (isCountIn) {
      metronomeSubDivisionSound = this.metronomeSoundCountIn;
      metronomeFirstNoteSound = this.metronomeSoundCountIn;
    }

    const blankString = getBlankString(
      this.customSettingsForPattern.timeSignature.beats,
      this.subDivision,
      this.metronomeSoundOff
    );

    let stringWithDivisions = blankString;
    const nth = getNth(
      this.customSettingsForPattern.playNotes,
      this.subDivision,
      this.customSettingsForPattern.timeSignature.division,
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

// replaces a character in a string at a given index.
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

function getNth(
  playNotes_: PlayNotes,
  subDivision: Subdivision,
  division_: MeasureDivision,
  isCountIn: boolean = false
) {
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
function getBlankString(beatsPerBar_: BeatsPerBar, subDivision: number, character: MetronomeSound) {
  const beatsPerBar = Number(beatsPerBar_);
  const multiplier = beatsPerBar * subDivision;
  return character.repeat(multiplier);
}
