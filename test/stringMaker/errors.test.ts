import PatternMaker from '../../src/utils/classes/patternMaker';

const patternMaker = PatternMaker.getInstance(4);

// TEMPORARILY SKIPPING
describe.skip('PatternMaker Errors', () => {
  describe('Test should fail when settings fill beat higher than beats per bar', () => {
    const setWrongSettings = () =>
      patternMaker.setSettings({
        playNotes: 'quarterNotes',
        playFillOn: { beat: '4', subBeat: '0' },
        timeSignature: { beats: '3', division: '4' },
      });
    it('should throw and error', () => {
      expect(setWrongSettings).toThrow(
        'Cannot set fill beat higher than the number of beats per bar.'
      );
    });
  });
  describe('Test should fail when settings fill sub-beat higher than subdivision', () => {
    const setWrongSettings = () =>
      patternMaker.setSettings({
        playNotes: 'quarterNotes',
        playFillOn: { beat: '4', subBeat: '5' },
        timeSignature: { beats: '4', division: '4' },
      });
    it('should throw and error', () => {
      expect(setWrongSettings).toThrow(
        'Cannot set a sub-beat higher than the number of subdivisions.'
      );
    });
  });
});
