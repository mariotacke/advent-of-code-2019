const print = (state) => state
  .map((row) => row.map((column) => column ? '#' : '.').join('')).join('\n');

const rate = (state) => state
  .flat()
  .reduce((sum, field, i) => sum + (field ? Math.pow(2, i) : 0), 0);

function step(state) {
  return state.map((row, y) => row.map((column, x) => {
    const neighbors = [
      (state[y - 1] || [])[x],
      (state[y + 1] || [])[x],
      state[y][x - 1],
      state[y][x + 1],
    ].filter((a) => a).length;

    return column ? neighbors === 1 : neighbors === 1 || neighbors === 2;
  }));
}

module.exports = (input) => {
  const initialState = input
    .split('\n')
    .map((line) => line.trim().split('').map((field) => field === '#'));

  const states = new Set();

  let nextState = initialState;

  while (!states.has(print(nextState))) {
    states.add(print(nextState));

    nextState = step(nextState);
  }

  return rate(nextState);
};
