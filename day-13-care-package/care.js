const intcode = require('./intcode');

module.exports = (input) => {
  const program = input.split(',').map(Number);
  const output = intcode(program, []);

  let blocks = 0;

  for (let i = 0; i < output.length; i += 3) {
    if (output[i + 2] === 2) {
      blocks++;
    }
  }

  return blocks;
};
