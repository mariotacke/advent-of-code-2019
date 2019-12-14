const names = ['Io', 'Europa', 'Ganymede', 'Callisto'];

const calculateEnergy = (moons) => {
  return moons
    .reduce((total, { x, y, z, vx, vy, vz }) => {
      const potentialEnergy = Math.abs(x) + Math.abs(y) + Math.abs(z);
      const kineticEnergy = Math.abs(vx) + Math.abs(vy) + Math.abs(vz);

      return total + potentialEnergy * kineticEnergy;
    }, 0);
};

module.exports = (input, iterations = 1000) => {
  const moons = input
    .split('\n')
    .map((line, i) => {
      const [x, y, z] = line.match(/(-?\d+)/g).map(Number);

      return { x, y, z, vx: 0, vy: 0, vz: 0, name: names[i] };
    });

  for (let i = 0; i < iterations; i++) {
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
  }

  return calculateEnergy(moons);
};
