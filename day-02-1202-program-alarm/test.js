const assert = require('assert');

const alarm = require('./alarm');

describe('Day 2: 1202 Program Alarm', () => {
  it('should interpret Intcode 1,9,10,3,2,3,11,0,99,30,40,50', () => {
    assert.strictEqual(alarm('1,9,10,3,2,3,11,0,99,30,40,50')[0], 3500);
  });

  it('should interpret Intcode 1,0,0,0,99', () => {
    assert.strictEqual(alarm('1,0,0,0,99')[0], 2);
  });

  it('should interpret Intcode 2,3,0,3,99', () => {
    assert.strictEqual(alarm('2,3,0,3,99')[3], 6);
  });

  it('should interpret Intcode 2,4,4,5,99,0', () => {
    assert.strictEqual(alarm('2,4,4,5,99,0')[5], 9801);
  });

  it('should interpret Intcode 1,1,1,4,99,5,6,0,99', () => {
    assert.deepStrictEqual(alarm('1,1,1,4,99,5,6,0,99'), [30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });
});
