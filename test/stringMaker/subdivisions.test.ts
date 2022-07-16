import assert from 'assert';
import MetronomePattern from '../../src/utils/classes/patternMaker';

const patternMaker = MetronomePattern.getInstance(8);

describe('MetronomePattern', () => {
  describe('Test default string on creation with SubDivision 8', () => {
    it('should return 10000000200000002000000020000000', () => {
      assert.equal(patternMaker.getMetronomeString(), '10000000200000002000000020000000');
      assert.equal(patternMaker.getMetronomeString().length, 32);
    });
  });
});
