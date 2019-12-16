const names = ['Io', 'Europa', 'Ganymede', 'Callisto'];
const axes = ['x', 'y', 'z'];

const getState = (moons, axis) => moons.map((moon) => moon[axis]).join(',');

// greatest common divisor
const gcd = (a, b) => !b ? a : gcd(b, a % b);

// least common multiple
const lcm = (a, b) => a * (b / gcd(a, b));

module.exports = (input) => {
  const moons = input
    .split('\n')
    .map((line, i) => {
      const [x, y, z] = line.match(/(-?\d+)/g).map(Number);

      return { x, y, z, vx: 0, vy: 0, vz: 0, name: names[i] };
    });

  const states = {
    x: [1, getState(moons, 'x'), false],
    y: [1, getState(moons, 'y'), false],
    z: [1, getState(moons, 'z'), false],
  };

  while (!axes.every((axis) => states[axis][2])) {
    moons.forEach((moon) => {
      const { x: x1, y: y1, z: z1 } = moon;

      moons
        .filter(({ name }) => name !== moon.name)
        .forEach(({ x: x2, y: y2, z: z2 }) => {
          moon.vx += x1 > x2 ? -1 : x1 < x2 ? 1 : 0;
          moon.vy += y1 > y2 ? -1 : y1 < y2 ? 1 : 0;
          moon.vz += z1 > z2 ? -1 : z1 < z2 ? 1 : 0;
        });
    });

    moons.forEach((moon) => {
      moon.x += moon.vx;
      moon.y += moon.vy;
      moon.z += moon.vz;
    });

    for (let a = 0; a < axes.length; a++) {
      const state = getState(moons, axes[a]);

      if (!states[axes[a]][2] && state === states[axes[a]][1]) {
        states[axes[a]][0] += 1;
        states[axes[a]][2] = true;
      } else if (!states[axes[a]][2]) {
        states[axes[a]][0] += 1;
      }
    }
  }

  return lcm(lcm(states.x[0], states.y[0]), states.z[0]);
};
