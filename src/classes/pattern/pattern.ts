import { IPatternSettings } from './models-interfaces';

class Pattern {
  private defaultPatternSettings: IPatternSettings = {
    playNotes: 'quarterNotes',
    timeSignature: { beats: '4', division: '4' },
  };

  private patternSettings: IPatternSettings; // user provided settings

  constructor(patternSettings?: IPatternSettings) {
    this.patternSettings = patternSettings
      ? { ...this.getDefaultPatternSettings(), ...patternSettings }
      : this.getDefaultPatternSettings();
  }

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
