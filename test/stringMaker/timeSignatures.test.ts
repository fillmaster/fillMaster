import assert from 'assert';
import PatternMaker from '../../src/utils/classes/patternMaker';

const patternMaker = PatternMaker.getInstance(8);

// QuarterNotes with 3/4
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

describe('Test custom pattern with quarterNotes', () => {
  it('should return 100000002000000020000000', () => {
    patternMaker.setSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeString();
    assert.equal(pattern, '100000002000000020000000');
    assert.equal(pattern.length, 24);
  });
});

describe('Test quarterNotes on and fill on beat 2', () => {
  it('should return 100000003000000020000000', () => {
    patternMaker.setSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '2', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '100000003000000020000000');
    assert.equal(pattern.length, 24);
  });
});

describe('Test quarterNotes on and fill on beat 1', () => {
  it('should return 300000002000000020000000', () => {
    patternMaker.setSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '1', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '300000002000000020000000');
    assert.equal(pattern.length, 24);
  });
});

// EighthNotes with 3/4
describe('Test custom pattern with eighthNotes', () => {
  it('should return 100020002000200020002000', () => {
    patternMaker.setSettings({
      playNotes: 'eighthNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeString();
    assert.equal(pattern, '100020002000200020002000');
    assert.equal(pattern.length, 24);
  });
});

describe('Test eighthNotes on and fill on beat 3', () => {
  it('should return 100020002000200030002000', () => {
    patternMaker.setSettings({
      playNotes: 'eighthNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '100020002000200030002000');
    assert.equal(pattern.length, 24);
  });
});

describe('Test eighthNotes on and fill on beat 2', () => {
  it('should return 100020003000200020002000', () => {
    patternMaker.setSettings({
      playNotes: 'eighthNotes',
      playFillOn: { beat: '2', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '100020003000200020002000');
    assert.equal(pattern.length, 24);
  });
});

describe('Test eighthNotes on and fill on beat 1', () => {
  it('should return 300020002000200020002000', () => {
    patternMaker.setSettings({
      playNotes: 'eighthNotes',
      playFillOn: { beat: '1', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '300020002000200020002000');
    assert.equal(pattern.length, 24);
  });
});

// EighthNotes with 3/4
describe('Test custom pattern with sixteenthNotes', () => {
  it('should return 102020202020202020202020', () => {
    patternMaker.setSettings({
      playNotes: 'sixteenthNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeString();
    assert.equal(pattern, '102020202020202020202020');
    assert.equal(pattern.length, 24);
  });
});

describe('Test sixteenthNotes on and fill on beat 3', () => {
  it('should return 102020202020202030202020', () => {
    patternMaker.setSettings({
      playNotes: 'sixteenthNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '102020202020202030202020');
    assert.equal(pattern.length, 24);
  });
});

describe('Test sixteenthNotes on and fill on beat 2', () => {
  it('should return 102020203020202020202020', () => {
    patternMaker.setSettings({
      playNotes: 'sixteenthNotes',
      playFillOn: { beat: '2', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '102020203020202020202020');
    assert.equal(pattern.length, 24);
  });
});

describe('Test sixteenthNotes on and fill on beat 1', () => {
  it('should return 302020202020202020202020', () => {
    patternMaker.setSettings({
      playNotes: 'sixteenthNotes',
      playFillOn: { beat: '1', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '302020202020202020202020');
    assert.equal(pattern.length, 24);
  });
});

// First Note Only with 3/4
describe('Test custom pattern with firstNoteOnly', () => {
  it('should return 100000000000000000000000', () => {
    patternMaker.setSettings({
      playNotes: 'firstNoteOnly',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeString();
    assert.equal(pattern, '100000000000000000000000');
    assert.equal(pattern.length, 24);
  });
});

describe('Test firstNoteOnly on and fill on beat 3', () => {
  it('should return 100000000000000030000000', () => {
    patternMaker.setSettings({
      playNotes: 'firstNoteOnly',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '100000000000000030000000');
    assert.equal(pattern.length, 24);
  });
});

describe('Test firstNoteOnly on and fill on beat 2', () => {
  it('should return 100000003000000000000000', () => {
    patternMaker.setSettings({
      playNotes: 'firstNoteOnly',
      playFillOn: { beat: '2', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '100000003000000000000000');
    assert.equal(pattern.length, 24);
  });
});

describe('Test firstNoteOnly on and fill on beat 1', () => {
  it('should return 300000000000000000000000', () => {
    patternMaker.setSettings({
      playNotes: 'firstNoteOnly',
      playFillOn: { beat: '1', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '300000000000000000000000');
    assert.equal(pattern.length, 24);
  });
});

// Comparing 3/4 to other time signatures

describe('Test pattern 3/4 against pattern 3/2', () => {
  it('should match both patterns', () => {
    patternMaker.setSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const patternQuarter = patternMaker.getMetronomeString();
    patternMaker.setSettings({
      playNotes: 'halfNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '2' },
    });
    const patternHalf = patternMaker.getMetronomeString();
    assert.equal(patternHalf, patternQuarter);
    assert.equal(patternHalf.length, patternQuarter.length);
  });
});

describe('Test pattern 3/4 against pattern 3/8', () => {
  it('should match both patterns', () => {
    patternMaker.setSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const patternQuarter = patternMaker.getMetronomeString();
    patternMaker.setSettings({
      playNotes: 'eighthNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '8' },
    });
    const patternEighth = patternMaker.getMetronomeString();
    assert.equal(patternEighth, patternQuarter);
    assert.equal(patternEighth.length, patternQuarter.length);
  });
});

describe('Test pattern 3/4 against pattern 3/16', () => {
  it('should match both patterns', () => {
    patternMaker.setSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const patternQuarter = patternMaker.getMetronomeString();
    patternMaker.setSettings({
      playNotes: 'sixteenthNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '16' },
    });
    const patternSixteenth = patternMaker.getMetronomeString();
    assert.equal(patternSixteenth, patternQuarter);
    assert.equal(patternSixteenth.length, patternQuarter.length);
  });
});

// Tests for 1/4

describe('Test pattern 1/4 against pattern 1/2', () => {
  it('should match both patterns', () => {
    patternMaker.setSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '1', division: '4' },
    });
    const patternQuarter = patternMaker.getMetronomeString();
    patternMaker.setSettings({
      playNotes: 'halfNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '1', division: '2' },
    });
    const patternHalf = patternMaker.getMetronomeString();
    assert.equal(patternHalf, patternQuarter);
    assert.equal(patternHalf.length, patternQuarter.length);
  });
});

describe('Test eighthNotes on and fill on beat 1', () => {
  it('should return 100020002000200020002000', () => {
    patternMaker.setSettings({
      playNotes: 'eighthNotes',
      playFillOn: { beat: '1', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    const pattern = patternMaker.getMetronomeStringWithFill();
    assert.equal(pattern, '300020002000200020002000');
    assert.equal(pattern.length, 24);
  });
});
