const assert = require('assert');

const image = require('./image');
const image2 = require('./image2');

describe('Day 8: Space Image Format', () => {
  it('should calculate image checksum', () => {
    assert.strictEqual(image('123456789012', 3, 2), 1);
  });

  describe('Part Two', () => {
    it('should decode image', () => {
      assert.strictEqual(image2('0222112222120000', 2, 2), ' X\nX ');
    });
  });
});
