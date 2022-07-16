import {
  DEFAULT_TIME_SIGNATURE,
  IPatternHelperSettings,
  IPatternSettings,
  SubDivision,
} from './models-interfaces';

class Pattern {

  protected defaultPatternSettings: IPatternSettings = {
    playNotes: 'quarterNotes',
    timeSignature: { beats: '4', division: '4' },
    subDivision = 8;
  };

  private patternSettings: IPatternSettings; // user provided settings

  constructor(patternSettings?: IPatternSettings, subDivision: SubDivision = 8) {
    this.patternSettings = patternSettings
      ? { ...this.getDefaultPatternSettings(), ...patternSettings }
      : this.getDefaultPatternSettings();
  }

  public getSubDivision = () => {
    return this.patternSettings.subDivision;
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
