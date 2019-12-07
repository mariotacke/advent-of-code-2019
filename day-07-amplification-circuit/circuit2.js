const AmplifierController = require('./amplifier-controller');

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
  const phases = getPermutations([5, 6, 7, 8, 9]);
  const thrusterSignals = [];

  for (let i = 0; i < phases.length; i++) {
    const amplifiers = phases[i]
      .map((phase) => new AmplifierController(input, phase));

    let index = 0;
    let lastOutput = 0;

    while (!amplifiers[4].terminated) {
      const output = amplifiers[index].run(lastOutput);

      if (output !== null) {
        lastOutput = output;
      }

      index = index + 1 === amplifiers.length ? 0 : index + 1;
    }

    thrusterSignals.push(Number(lastOutput));
  }

  return thrusterSignals.sort((a, b) => b - a)[0];
};
