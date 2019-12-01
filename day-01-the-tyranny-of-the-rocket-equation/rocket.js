module.exports = (input) => {
  const modules = input
    .split('\n')
    .map((line) => parseInt(line));

  return modules.reduce((a, b) => Math.floor(b / 3) - 2 + a, 0);
};
