import MetronomePattern from '../../src/classes/pattern/metronomePattern';

const patternMaker = MetronomePattern.getInstance();

// TEMPORARILY SKIPPING
describe.skip('MetronomePattern Errors', () => {
  describe('Test should fail when settings fill beat higher than beats per bar', () => {
    const setWrongSettings = () =>
      patternMaker.setPatternSettings({
        playNotes: 'quarterNotes',
        timeSignature: { beats: '3', division: '4' },
      });
    patternMaker.setPlayHelperOn({ beat: '4', subBeat: '0' });
    it('should throw and error', () => {
      expect(setWrongSettings).toThrow(
        'Cannot set fill beat higher than the number of beats per bar.'
      );
    });
  });
  describe('Test should fail when settings fill sub-beat higher than subdivision', () => {
    const setWrongSettings = () =>
      patternMaker.setPatternSettings({
        playNotes: 'quarterNotes',
        timeSignature: { beats: '4', division: '4' },
      });
    patternMaker.setPlayHelperOn({ beat: '4', subBeat: '5' });
    it('should throw and error', () => {
      expect(setWrongSettings).toThrow(
        'Cannot set a sub-beat higher than the number of subdivisions.'
      );
    });
  });
});
