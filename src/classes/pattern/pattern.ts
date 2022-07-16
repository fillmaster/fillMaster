import { IPatternSettings, SubDivision } from './models-interfaces';

class Pattern {
  protected subDivision: SubDivision;

  private defaultPatternSettings: IPatternSettings = {
    playNotes: 'quarterNotes',
    timeSignature: { beats: '4', division: '4' },
  };

  private patternSettings: IPatternSettings; // user provided settings

  constructor(patternSettings?: IPatternSettings, subDivision: SubDivision = 8) {
    this.patternSettings = patternSettings
      ? { ...this.getDefaultPatternSettings(), ...patternSettings }
      : this.getDefaultPatternSettings();
    this.subDivision = subDivision;
  }

  public getSubDivision = () => {
    return this.subDivision;
  };

  getDefaultPatternSettings(): IPatternSettings {
    return { ...this.defaultPatternSettings };
  }

  getPatternSettings(): IPatternSettings {
    return this.patternSettings;
  }

  setPatternSettings(patternSettings: IPatternSettings): void {
    this.patternSettings = patternSettings;
  }

  resetPatternSettingsToDefault(): void {
    this.patternSettings = { ...this.getDefaultPatternSettings() };
  }
}

export default Pattern;
