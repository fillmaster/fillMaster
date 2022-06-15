import assert from 'assert';
import PatternMaker from '../../src/utils/classes/patternMaker';

const patternMaker = PatternMaker.getInstance(8);

describe('PatternMaker', () => {
  describe('Test default string on creation with SubDivision 8', () => {
    it('should return 10000000200000002000000020000000', () => {
      assert.equal(patternMaker.getMetronomeString(), '10000000200000002000000020000000');
      assert.equal(patternMaker.getMetronomeString().length, 32);
    });
  });
});
