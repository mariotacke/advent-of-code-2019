const assert = require('assert');

const body = require('./body');
const body2 = require('./body2');

describe('Day 12: The N-Body Problem', () => {
  it('should compute the total energy in system 1', () => {
    const system =
      `<x=-1, y=0, z=2>
       <x=2, y=-10, z=-7>
       <x=4, y=-8, z=8>
       <x=3, y=5, z=-1>`;

    assert.strictEqual(body(system, 10), 179);
  });

  it('should compute the total energy in system 2', () => {
    const system =
      `<x=-8, y=-10, z=0>
       <x=5, y=5, z=10>
       <x=2, y=-7, z=3>
       <x=9, y=-8, z=-3>`;

    assert.strictEqual(body(system, 100), 1940);
  });

  describe('Part Two', () => {
    it('should compute the steps in system 1', () => {
      const system =
        `<x=-1, y=0, z=2>
         <x=2, y=-10, z=-7>
         <x=4, y=-8, z=8>
         <x=3, y=5, z=-1>`;

      assert.strictEqual(body2(system), 2772);
    });

    it('should compute the steps in system 2', () => {
      const system =
        `<x=-8, y=-10, z=0>
         <x=5, y=5, z=10>
         <x=2, y=-7, z=3>
         <x=9, y=-8, z=-3>`;

      assert.strictEqual(body2(system), 4686774924);
    });
  });
});
