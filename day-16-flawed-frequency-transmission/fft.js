const basePattern = [0, 1, 0, -1];

const getPattern = (position) => {
  let repeatedBasePattern = [];

  for (let i = 0; i < basePattern.length; i++) {
    const segment = Array.from({ length: position }, () => basePattern[i]);

    repeatedBasePattern = repeatedBasePattern.concat(segment);
  }

  repeatedBasePattern.push(repeatedBasePattern.shift());

  return repeatedBasePattern;
};

module.exports = (input, phases = 100) => {
  let signal = input.split('').map(Number);

  const patterns = Array
    .from({ length: signal.length })
    .map((_, i) => getPattern(i + 1));

  for (let p = 0; p < phases; p++) {
    signal = Array.from({ length: signal.length }).map((_, position) => {
      const pattern = patterns[position];
      const product = signal.reduce((total, element, i) => {
        return total + (element * pattern[i % pattern.length]);
      }, 0);

      return Number(`${product}`.split('').reverse()[0]);
    });
  }

  return signal.join('').slice(0, 8);
};
