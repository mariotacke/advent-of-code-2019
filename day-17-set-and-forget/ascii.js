const intcode = require('./intcode');

module.exports = (input) => {
  const program = input.split(',').map(Number);
  const view = intcode(program);
  const frame = String.fromCodePoint(...view);

  return frame
    .split('\n')
    .reduce((sum, row, y, all) => {
      for (let x = 0; x < row.length; x++) {
        const positions = [
          row[x],
          row[x - 1],
          row[x + 1],
          (all[y - 1] || [])[x],
          (all[y + 1] || [])[x]
        ];

        if (positions.every((position) => position === '#')) {
          sum += x * y;
        }
      }

      return sum;
    }, 0);
};
