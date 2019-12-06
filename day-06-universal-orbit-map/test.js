const assert = require('assert');

const orbits = require('./orbits');
const orbits2 = require('./orbits2');

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

  describe('Part Two', () => {
    it('should calculate the minimum number of orbital transfers required', () => {
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
         K)L
         K)YOU
         I)SAN`;

      assert.strictEqual(orbits2(input), 4);
    });
  });
});
