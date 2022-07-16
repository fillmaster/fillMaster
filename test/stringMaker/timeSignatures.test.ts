import assert from 'assert';
import PatternMaker from '../../src/utils/classes/patternMaker';

const patternMaker = PatternMaker.getInstance(8);

describe('Test quarterNotes on and fill on beat 3', () => {
  it('should return 100000002000000030000000', () => {
    patternMaker.setSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '100000002000000030000000');
    assert.equal(pattern.length, 24);
  });
});
