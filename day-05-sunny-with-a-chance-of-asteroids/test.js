const assert = require('assert');

const asteroids = require('./asteroids');
const asteroids2 = require('./asteroids2');

describe('Day 5: Sunny with a Chance of Asteroids', () => {
  it('should run diagnostics', () => {
    assert.strictEqual(asteroids('3,0,4,0,99', [9]), '9');
    assert.strictEqual(asteroids('3,0,4,0,99', [10]), '10');

    assert.strictEqual(asteroids('1002,4,3,4,33', [0]), '0');

    assert.strictEqual(asteroids('1101,100,-1,4,0', [0]), '0');
  });

  describe('Part Two', () => {
    it('should perform jump tests', () => {
      assert.strictEqual(asteroids2('3,9,8,9,10,9,4,9,99,-1,8', [7]), '0');
      assert.strictEqual(asteroids2('3,9,8,9,10,9,4,9,99,-1,8', [8]), '1');
      assert.strictEqual(asteroids2('3,9,8,9,10,9,4,9,99,-1,8', [9]), '0');

      assert.strictEqual(asteroids2('3,9,7,9,10,9,4,9,99,-1,8', [7]), '1');
      assert.strictEqual(asteroids2('3,9,7,9,10,9,4,9,99,-1,8', [8]), '0');

      assert.strictEqual(asteroids2('3,3,1108,-1,8,3,4,3,99', [7]), '0');
      assert.strictEqual(asteroids2('3,3,1108,-1,8,3,4,3,99', [8]), '1');
      assert.strictEqual(asteroids2('3,3,1108,-1,8,3,4,3,99', [9]), '0');

      assert.strictEqual(asteroids2('3,3,1107,-1,8,3,4,3,99', [7]), '1');
      assert.strictEqual(asteroids2('3,3,1107,-1,8,3,4,3,99', [8]), '0');

      assert.strictEqual(asteroids2('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', [0]), '0');
      assert.strictEqual(asteroids2('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', [1]), '1');

      assert.strictEqual(asteroids2('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', [0]), '0');
      assert.strictEqual(asteroids2('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', [1]), '1');

      const largeExample = '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99';

      assert.strictEqual(asteroids2(largeExample, [7]), '999');
      assert.strictEqual(asteroids2(largeExample, [8]), '1000');
      assert.strictEqual(asteroids2(largeExample, [9]), '1001');
    });
  });
});
