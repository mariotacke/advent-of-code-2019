const assert = require('assert');

const image = require('./image');

describe('Day 8: Space Image Format', () => {
  it('should calculate image checksum', () => {
    assert.strictEqual(image('123456789012', 3, 2), 1);
  });
});
