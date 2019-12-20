module.exports = (input, phases = 100) => {
  const messageOffset = Number(input.slice(0, 7));
  const signal = input
    .repeat(10000)
    .split('')
    .map(Number)
    .slice(messageOffset);

  for (let p = 0; p < phases; p++) {
    for (let i = signal.length - 1; i >= 0; i--) {
      signal[i] = ((signal[i + 1] || 0) + signal[i]) % 10;
    }
  }

  return signal.slice(0, 8).join('');
};
