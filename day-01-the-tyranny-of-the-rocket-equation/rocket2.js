module.exports = (input) => {
  const x = input
    .split('\n')
    .map((line) => parseInt(line))
    .map((initialMass) => {
      let totalFuel = 0;
      let remainingMass = initialMass;

      while (remainingMass > 0) {
        const fuel = Math.floor(remainingMass / 3) - 2;

        if (fuel <= 0) {
          break;
        }

        totalFuel += fuel;
        remainingMass = fuel;
      }

      return totalFuel;
    });

  return x.reduce((a, b) => a + b, 0);
};
