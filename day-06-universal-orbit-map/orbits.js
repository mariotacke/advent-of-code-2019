module.exports = (input) => {
  const orbits = input
    .split('\n')
    .reduce((orbits, line) => {
      const [object1, object2] = line.trim().split(')');

      orbits[object2] = object1;

      return orbits;
    }, {});

  let totalNumberOfOrbits = 0;
  let objectsOrbitingAnother = Object.keys(orbits);

  for (let i = 0; i < objectsOrbitingAnother.length; i++) {
    const currentObject = objectsOrbitingAnother[i];

    let nextObject = orbits[currentObject];

    while (nextObject) {
      nextObject = orbits[nextObject];
      totalNumberOfOrbits += 1;
    }
  }

  return totalNumberOfOrbits;
};
