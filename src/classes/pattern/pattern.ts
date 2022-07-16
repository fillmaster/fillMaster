import {
  DEFAULT_TIME_SIGNATURE,
  IPatternHelperSettings,
  IPatternSettings,
  SubDivision,
} from './models-interfaces';

class Pattern {
  protected subDivision: SubDivision;

  protected defaultPatternSettings: IPatternSettings = {
    playNotes: 'quarterNotes',
    timeSignature: { beats: '4', division: '4' },
  };

  private patternSettings: IPatternSettings; // user provided settings

  constructor(patternSettings?: IPatternSettings) {
    this.patternSettings = patternSettings
      ? { ...this.getDefaultPatternSettings(), ...patternSettings }
      : this.getDefaultPatternSettings();
    this.subDivision = 8;
  }

  public getSubDivision = () => {
    return this.subDivision;
  };

  public setSubDivision = (subDivision: SubDivision) => {
    this.subDivision = subDivision;
  };

  public resetTimeSignature = () => {
    this.patternSettings = {
      ...this.patternSettings,
      timeSignature: DEFAULT_TIME_SIGNATURE,
    };
  };

  getDefaultPatternSettings(): IPatternSettings | IPatternHelperSettings {
    return { ...this.defaultPatternSettings };
  }

  getPatternSettings(): IPatternSettings | IPatternHelperSettings {
    return this.patternSettings;
  }

  setPatternSettings(patternSettings: IPatternSettings | IPatternHelperSettings): void {
    this.patternSettings = patternSettings;
  }

  resetPatternSettingsToDefault(): void {
    this.patternSettings = { ...this.getDefaultPatternSettings() };
  }
}

export default Pattern;
