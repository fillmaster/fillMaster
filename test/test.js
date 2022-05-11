import PatternMaker from '../dist/utils/stringMaker.js'
import { strict as assert } from 'assert';

const patternMaker = new PatternMaker();

describe('StringMaker', function() {
  
  describe('Test default string on creation', () => {
    it('should return 1000200020002000', () => {
      assert.equal(patternMaker.getMetronomeString(), '1000200020002000')
      assert.equal(patternMaker.getMetronomeString().length, 16)
    })
  })

describe('Test custom pattern with no first-note-only', () => {
  it('should return 100000000000000', () => {
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'firstNoteOnly'})
    assert.equal(patternMaker.getMetronomeString(), '1000000000000000')
    assert.equal(patternMaker.getMetronomeString().length, 16)
  })
})

describe('Test custom pattern with quarter-notes', () => {
  it('should return 1000200020002000', () => {
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'quarterNotes'})
    assert.equal(patternMaker.getMetronomeString(), '1000200020002000')
    assert.equal(patternMaker.getMetronomeString().length, 16)
  })
})

describe('Test custom pattern with eight-notes', () => {
  it('should return 1020202020202020', () => {
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'eighthNotes'})
    assert.equal(patternMaker.getMetronomeString(), '1020202020202020')
    assert.equal(patternMaker.getMetronomeString().length, 16)
  })
})

describe('Test custom pattern with sixteenth-notes', () => {
  it('should return 1222222222222222', () => {
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'sixteenthNotes'})
    assert.equal(patternMaker.getMetronomeString(), '1222222222222222')
    assert.equal(patternMaker.getMetronomeString().length, 16)
  })
})

describe('Test custom pattern with sixteenth-notes', () => {
  it('should return 1222222222222222', () => {
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'quarterNotes'})
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'eighthNotes'})
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'sixteenthNotes'})
    assert.equal(patternMaker.getMetronomeString(), '1222222222222222')
    assert.equal(patternMaker.getMetronomeString().length, 16)
  })
})

describe('Test custom pattern set to default', () => {
  it('should return 1000200020002000', () => {
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'sixteenthNotes'});
    patternMaker.setCustomSettingsForPatternToDefault();
    assert.equal(patternMaker.getMetronomeString(), '1000200020002000')
    assert.equal(patternMaker.getMetronomeString().length, 16)
  })
})

describe('Test custom pattern set to default and back', () => {
  it('should return 1000000000000000', () => {
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'sixteenthNotes'});
    patternMaker.setCustomSettingsForPatternToDefault();
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'firstNoteOnly'})
    assert.equal(patternMaker.getMetronomeString(), '1000000000000000')
    assert.equal(patternMaker.getMetronomeString().length, 16)
  })
})

describe('Test fill when start set to 1', () => {
  it('should return 3000200020002000', () => {
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'quarterNotes',
      playFillOn: '1'});
    assert.equal(patternMaker.getMetronomeString(), '1000200020002000');
    assert.equal(patternMaker.getMetronomeString().length, 16);
    assert.equal(patternMaker.getMetronomeStringWithFill(), '3000200020002000');
    assert.equal(patternMaker.getMetronomeStringWithFill().length, 16);
  })
})

describe('Test fill when start set to 2', () => {
  it('should return 1000300020002000', () => {
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'quarterNotes',
      playFillOn: '2'});
    assert.equal(patternMaker.getMetronomeStringWithFill(), '1000300020002000');
    assert.equal(patternMaker.getMetronomeStringWithFill().length, 16);
  })
})

describe('Test fill when start set to 3', () => {
  it('should return 1020202030202020', () => {
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'eighthNotes',
      playFillOn: '3'});
    assert.equal(patternMaker.getMetronomeStringWithFill(), '1020202030202020');
    assert.equal(patternMaker.getMetronomeStringWithFill().length, 16);
  })
})

describe('Test fill when start set to 4', () => {
  it('should return 1000000000003000', () => {
    patternMaker.setCustomSettingsForPattern(
      {playNotes: 'firstNoteOnly',
      playFillOn: '4'});
    assert.equal(patternMaker.getMetronomeStringWithFill(), '1000000000003000');
    assert.equal(patternMaker.getMetronomeStringWithFill().length, 16);
  })
})

})