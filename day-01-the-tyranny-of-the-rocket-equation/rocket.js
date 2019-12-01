module.exports = (input) => {
  return input
    .split('\n')
    .map((line) => parseInt(line))
    .reduce((a, b) => Math.floor(b / 3) - 2 + a, 0);
};
