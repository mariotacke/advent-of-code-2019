module.exports = (input) => {
  const asteroids = input
    .split('\n')
    .reduce((objects, line, y) => {
      line.trim().split('').forEach((space, x) => {
        if (space === '#') {
          objects.push({ x, y });
        }
      });

      return objects;
    }, []);

  return asteroids
    .map(({ x: x1, y: y1 }) => {
      const angles = new Set();

      asteroids.forEach(({ x: x2, y: y2 }) => {
        if (!(x1 === x2 && y1 === y2)) {
          angles.add(Math.atan2(y2 - y1, x2 - x1));
        }
      });

      return {
        asteroids: angles.size,
        x: x1,
        y: y1,
      };
    })
    .sort((a, b) => b.asteroids - a.asteroids)[0];
};
