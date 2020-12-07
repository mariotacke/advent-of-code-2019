const assert = require('assert');

const biodiversity = require('./biodiversity');

describe('Day 24: Planet of Discord', () => {
  it('should compute biodiversity rating', () => {
    const input =
     `....#
      #..#.
      #..##
      ..#..
      #....`;

    assert.strictEqual(biodiversity(input), 2129920);
  });
});
