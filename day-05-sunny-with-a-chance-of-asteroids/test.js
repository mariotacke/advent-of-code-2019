const assert = require('assert');

const asteroids = require('./asteroids');

describe('Day 5: Sunny with a Chance of Asteroids', () => {
  it('should run diagnostics', () => {
    assert.strictEqual(asteroids('3,0,4,0,99', 9), '9');
    assert.strictEqual(asteroids('3,0,4,0,99', 10), '10');

    assert.strictEqual(asteroids('1002,4,3,4,33', 0), '0');

    assert.strictEqual(asteroids('1101,100,-1,4,0', 0), '0');
  });
});
