const assert = require('assert');

const rocket = require('./rocket');
const rocket2 = require('./rocket2');

describe('Day 1: The Tyranny of the Rocket Equation', () => {
  it('should calculate fuel requirements for module mass 12', () => {
    assert.strictEqual(rocket('12'), 2);
  });

  it('should calculate fuel requirements for module mass 14', () => {
    assert.strictEqual(rocket('14'), 2);
  });

  it('should calculate fuel requirements for module mass 1969', () => {
    assert.strictEqual(rocket('1969'), 654);
  });

  it('should calculate fuel requirements for module mass 100756', () => {
    assert.strictEqual(rocket('100756'), 33583);
  });

  describe('Part Two', () => {
    it('should calculate fuel requirements for module mass 14', () => {
      assert.strictEqual(rocket2('14'), 2);
    });

    it('should calculate fuel requirements for module mass 1969', () => {
      assert.strictEqual(rocket2('1969'), 966);
    });

    it('should calculate fuel requirements for module mass 100756', () => {
      assert.strictEqual(rocket2('100756'), 50346);
    });
  });
});
