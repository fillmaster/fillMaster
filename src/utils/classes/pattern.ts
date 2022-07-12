import { IPatternSettings } from "./models-interfaces";

export class Pattern {
	// metronome sound should not be here?
	// private metronomeSound: MetronomeSounds = MetronomeSounds.MetronomeSoundOff;

	private defaultPatternSettings: IPatternSettings = {
		playNotes: 'quarterNotes',
		playFillOn: { beat: '3', subBeat: '0' }, // can we make these objects into classes of their own or will it be overkill?
		timeSignature: { beats: '4', division: '4' }, // can we make these objects into classes of their own or will it be overkill?
	};;

	private patternSettings: IPatternSettings; // user provided settings

	constructor(patternSettings?: IPatternSettings) {
		this.patternSettings = patternSettings ? { ...this.getDefaultPatternSettings(), ...patternSettings} : this.getDefaultPatternSettings(); 
	}

	getDefaultPatternSettings(): IPatternSettings {
		return { ...this.defaultPatternSettings }
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
