module.exports = (input, overrides = []) => {
  const intcodes = input
    .split(',')
    .map(Number);

  let position = 0;

  if (overrides.length) {
    intcodes[1] = overrides[0];
    intcodes[2] = overrides[1];
  }

  while (intcodes[position] !== 99) {
    const opcode = intcodes[position];
    const input1 = intcodes[intcodes[position + 1]];
    const input2 = intcodes[intcodes[position + 2]];
    const output = intcodes[position + 3];

    if (opcode === 1) {
      intcodes[output] = input1 + input2;
    } else if (opcode === 2) {
      intcodes[output] = input1 * input2;
    }

    position += 4;
  }

  return intcodes;
};
