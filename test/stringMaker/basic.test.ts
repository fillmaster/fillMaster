import assert from 'assert';
import MetronomePattern from '../../src/utils/classes/patternMaker';

const patternMaker = MetronomePattern.getInstance(4);

// Original Tests

describe('MetronomePattern', () => {
  describe('Test default string on creation', () => {
    it('should return 1000200020002000', () => {
      assert.equal(patternMaker.getMetronomeString(), '1000200020002000');
      assert.equal(patternMaker.getMetronomeString().length, 16);
    });
  });
});

describe('Test custom pattern with no first-note-only', () => {
  it('should return 100000000000000', () => {
    patternMaker.setPatternSettings({
      playNotes: 'wholeNotes',
      playFillOn: { beat: '4', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeString(), '1000000000000000');
    assert.equal(patternMaker.getMetronomeString().length, 16);
  });
});

describe('Test custom pattern with quarter-notes', () => {
  it('should return 1000200020002000', () => {
    patternMaker.setPatternSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '4', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeString(), '1000200020002000');
    assert.equal(patternMaker.getMetronomeString().length, 16);
  });
});

describe('Test custom pattern with eight-notes', () => {
  it('should return 1020202020202020', () => {
    patternMaker.setPatternSettings({
      playNotes: 'eighthNotes',
      playFillOn: { beat: '4', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeString(), '1020202020202020');
    assert.equal(patternMaker.getMetronomeString().length, 16);
  });
});

describe('Test custom pattern with sixteenth-notes', () => {
  it('should return 1222222222222222', () => {
    patternMaker.setPatternSettings({
      playNotes: 'sixteenthNotes',
      playFillOn: { beat: '4', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeString(), '1222222222222222');
    assert.equal(patternMaker.getMetronomeString().length, 16);
  });
});

describe('Test custom pattern with sixteenth-notes', () => {
  it('should return 1222222222222222', () => {
    patternMaker.setPatternSettings({
      playNotes: 'sixteenthNotes',
      playFillOn: { beat: '4', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeString(), '1222222222222222');
    assert.equal(patternMaker.getMetronomeString().length, 16);
  });
});

describe('Test custom pattern set to default', () => {
  it('should return 1000200020002000', () => {
    patternMaker.setPatternSettings({
      playNotes: 'sixteenthNotes',
      playFillOn: { beat: '4', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    patternMaker.setPatternSettingsToDefault();
    assert.equal(patternMaker.getMetronomeString(), '1000200020002000');
    assert.equal(patternMaker.getMetronomeString().length, 16);
  });
});

describe('Test custom pattern set to default and back', () => {
  it('should return 1000000000000000', () => {
    patternMaker.setPatternSettings({
      playNotes: 'sixteenthNotes',
      playFillOn: { beat: '4', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    patternMaker.setPatternSettingsToDefault();
    patternMaker.setPatternSettings({
      playNotes: 'wholeNotes',
      playFillOn: { beat: '4', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeString(), '1000000000000000');
    assert.equal(patternMaker.getMetronomeString().length, 16);
  });
});

describe('Test fill when start set to 1', () => {
  it('should return 3000200020002000', () => {
    patternMaker.setPatternSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '1', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeString(), '1000200020002000');
    assert.equal(patternMaker.getMetronomeString().length, 16);
    assert.equal(patternMaker.getMetronomeStringWithFill(), '3000200020002000');
    assert.equal(patternMaker.getMetronomeStringWithFill().length, 16);
  });
});

describe('Test fill when start set to 2', () => {
  it('should return 1000300020002000', () => {
    patternMaker.setPatternSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '2', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeStringWithFill(), '1000300020002000');
    assert.equal(patternMaker.getMetronomeStringWithFill().length, 16);
  });
});

describe('Test fill when start set to 3', () => {
  it('should return 1020202030202020', () => {
    patternMaker.setPatternSettings({
      playNotes: 'eighthNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeStringWithFill(), '1020202030202020');
    assert.equal(patternMaker.getMetronomeStringWithFill().length, 16);
  });
});

describe('Test fill when start set to 4', () => {
  it('should return 1000000000003000', () => {
    patternMaker.setPatternSettings({
      playNotes: 'wholeNotes',
      playFillOn: { beat: '4', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeStringWithFill(), '1000000000003000');
    assert.equal(patternMaker.getMetronomeStringWithFill().length, 16);
  });
});

// Newer Tests
describe('Test halfNotes on and fill on beat 4', () => {
  it('should return 1000000020003000', () => {
    patternMaker.setPatternSettings({
      playNotes: 'halfNotes',
      playFillOn: { beat: '4', subBeat: '0' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeStringWithFill(), '1000000020003000');
    assert.equal(patternMaker.getMetronomeStringWithFill().length, 16);
  });
});
describe('Test quarterNotes on and fill on beat 3', () => {
  it('should return 100020003000', () => {
    patternMaker.setPatternSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '3', subBeat: '0' },
      timeSignature: { beats: '3', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeStringWithFill(), '100020003000');
    assert.equal(patternMaker.getMetronomeStringWithFill().length, 12);
  });
});
describe('Test fill start on the e of 2', () => {
  it('should return 1000230020002000', () => {
    patternMaker.setPatternSettings({
      playNotes: 'quarterNotes',
      playFillOn: { beat: '2', subBeat: '1' },
      timeSignature: { beats: '4', division: '4' },
    });
    assert.equal(patternMaker.getMetronomeStringWithFill(), '1000230020002000');
    assert.equal(patternMaker.getMetronomeStringWithFill().length, 16);
  });
});
