const assert = require('assert');

const station = require('./station');
const station2 = require('./station2');

describe('Day 10: Monitoring Station', () => {
  it('should determine best location in sample map 1 (small)', () => {
    const map =
      `.#..#
       .....
       #####
       ....#
       ...##`;

    assert.deepStrictEqual(station(map), { x: 3, y: 4, asteroids: 8 });
  });

  it('should determine best location in sample map 2 (medium)', () => {
    const map =
      `......#.#.
       #..#.#....
       ..#######.
       .#.#.###..
       .#..#.....
       ..#....#.#
       #..#....#.
       .##.#..###
       ##...#..#.
       .#....####`;

    assert.deepStrictEqual(station(map), { x: 5, y: 8, asteroids: 33 });
  });

  it('should determine best location in sample map 3 (medium)', () => {
    const map =
      `#.#...#.#.
       .###....#.
       .#....#...
       ##.#.#.#.#
       ....#.#.#.
       .##..###.#
       ..#...##..
       ..##....##
       ......#...
       .####.###.`;

    assert.deepStrictEqual(station(map), { x: 1, y: 2, asteroids: 35 });
  });

  it('should determine best location in sample map 4 (medium)', () => {
    const map =
      `.#..#..###
       ####.###.#
       ....###.#.
       ..###.##.#
       ##.##.#.#.
       ....###..#
       ..#.#..#.#
       #..#.#.###
       .##...##.#
       .....#.#..`;

    assert.deepStrictEqual(station(map), { x: 6, y: 3, asteroids: 41 });
  });

  it('should determine best location in sample map 5 (large)', () => {
    const map =
      `.#..##.###...#######
       ##.############..##.
       .#.######.########.#
       .###.#######.####.#.
       #####.##.#.##.###.##
       ..#####..#.#########
       ####################
       #.####....###.#.#.##
       ##.#################
       #####.##.###..####..
       ..######..##.#######
       ####.##.####...##..#
       .#####..#.######.###
       ##...#.##########...
       #.##########.#######
       .####.#.###.###.#.##
       ....##.##.###..#####
       .#.#.###########.###
       #.#.#.#####.####.###
       ###.##.####.##.#..##`;

    assert.deepStrictEqual(station(map), { x: 11, y: 13, asteroids: 210 });
  });

  describe('Part Two', () => {
    it('should find the 200th asteroid to be vaporized', () => {
      const map =
        `.#..##.###...#######
         ##.############..##.
         .#.######.########.#
         .###.#######.####.#.
         #####.##.#.##.###.##
         ..#####..#.#########
         ####################
         #.####....###.#.#.##
         ##.#################
         #####.##.###..####..
         ..######..##.#######
         ####.##.####...##..#
         .#####..#.######.###
         ##...#.##########...
         #.##########.#######
         .####.#.###.###.#.##
         ....##.##.###..#####
         .#.#.###########.###
         #.#.#.#####.####.###
         ###.##.####.##.#..##`;

      assert.deepStrictEqual(station2(map, { x: 11, y: 13 }), 802);
    });
  });
});
