const intcode = require('../day-05-sunny-with-a-chance-of-asteroids/asteroids2');

const getPermutations = (set = []) => {
  const permutations = [];

  const permute = (candidates = [], sequence = []) => {
    if (!candidates.length) {
      permutations.push(sequence);

      return;
    }

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      permute(
        [...candidates.filter((x) => x !== candidate)],
        [...sequence, candidate]
      );
    }
  };

  permute(set);

  return permutations;
};

module.exports = (input) => {
  const phases = getPermutations([0, 1, 2, 3, 4]);
  const thrusterSignals = [];

  for (let i = 0; i < phases.length; i++) {
    const a = intcode(input, [phases[i][0], 0]);
    const b = intcode(input, [phases[i][1], a]);
    const c = intcode(input, [phases[i][2], b]);
    const d = intcode(input, [phases[i][3], c]);
    const e = intcode(input, [phases[i][4], d]);

    thrusterSignals.push(Number(`${e}`));
  }

  return thrusterSignals.sort((a, b) => b - a)[0];
};
