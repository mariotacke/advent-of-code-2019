const assert = require('assert');

const orbits = require('./orbits');

describe('Day 6: Universal Orbit Map', () => {
  it('should calculate the number of direct and indirect orbits', () => {
    const input =
      `COM)B
       B)C
       C)D
       D)E
       E)F
       B)G
       G)H
       D)I
       E)J
       J)K
       K)L`;

    assert.strictEqual(orbits(input), 42);
  });
});
