const assert = require('assert');

const sensor = require('./sensor');

describe('Day 9: Sensor Boost', () => {
  it('should output a copy of itself', () => {
    assert.strictEqual(
      sensor('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99', []),
      '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'
    );
  });

  it('should output a 16-digit number', () => {
    assert.strictEqual(
      sensor('1102,34915192,34915192,7,4,7,99,0', []),
      '1219070632396864'
    );
  });

  it('should output the large number in the middle', () => {
    assert.strictEqual(
      sensor('104,1125899906842624,99', []),
      '1125899906842624'
    );
  });
});
