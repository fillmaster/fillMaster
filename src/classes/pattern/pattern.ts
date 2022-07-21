import {
  DEFAULT_TIME_SIGNATURE,
  IPatternHelperSettings,
  IPatternSettings,
  SubDivision,
} from './models-interfaces';

abstract class Pattern {
  protected subDivision: SubDivision;

  protected defaultPatternSettings: IPatternSettings = {
    playNotes: 'quarterNotes',
    timeSignature: { beats: '4', division: '4' },
  };

  protected patternSettings: IPatternSettings; // user provided settings

  public constructor(patternSettings?: IPatternSettings) {
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

  public abstract getMetronomeString(): string;

  public getDefaultPatternSettings(): IPatternSettings | IPatternHelperSettings {
    return { ...this.defaultPatternSettings };
  }

  public getPatternSettings(): IPatternSettings | IPatternHelperSettings {
    return this.patternSettings;
  }

  public setPatternSettings(patternSettings: IPatternSettings): void {
    this.patternSettings = patternSettings;
  }

  public resetPatternSettingsToDefault(): void {
    this.patternSettings = { ...this.getDefaultPatternSettings() };
  }
}

export default Pattern;
