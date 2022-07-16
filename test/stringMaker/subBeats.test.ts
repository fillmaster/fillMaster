import assert from 'assert';
import MetronomePattern from '../../src/classes/pattern/metronomePattern';

const patternMaker = MetronomePattern.getInstance();

// music speak (with 4 subdivisions):
// fill on the e of 1 = 1300
// fill on the & of 1 = 1030
// fill on the a of 1 = 1003

describe('Test fill start on the e of 2', () => {
  it('should return 1000230020002000', () => {
    patternMaker.setSubDivision(4);
    patternMaker.setPatternSettings({
      playNotes: 'quarterNotes',
      playHelperOn: { beat: '2', subBeat: '1' },
      timeSignature: { beats: '4', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '1000230020002000');
    assert.equal(pattern.length, 16);
  });
});

// add more tests

// music speak (with 8 subdivisions):
// fill on the e of 1 = 10300000
// fill on the & of 1 = 10003000
// fill on the a of 1 = 10000030

describe('Test fill start on the e of 2', () => {
  it('should return 10000000203000002000000020000000', () => {
    patternMaker.setSubDivision(8);
    patternMaker.setPatternSettings({
      playNotes: 'quarterNotes',
      playHelperOn: { beat: '2', subBeat: '2' },
      timeSignature: { beats: '4', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '10000000203000002000000020000000');
    assert.equal(pattern.length, 32);
  });
});
