import assert from 'assert';
import MetronomePattern from '../../src/classes/pattern/metronomePattern';

const patternMaker = MetronomePattern.getInstance();

describe('Test quarterNotes on and fill on beat 3', () => {
  it('should return 100000002000000030000000', () => {
    patternMaker.setPatternSettings({
      playNotes: 'quarterNotes',
      playHelperOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '100000002000000030000000');
    assert.equal(pattern.length, 24);
  });
});
