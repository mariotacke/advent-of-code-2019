module.exports = (input, output = 19690720) => {
  const initialMemoryState = input
    .split(',')
    .map(Number);

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const memory = [...initialMemoryState];

      let instructionPointer = 0;

      memory[1] = noun;
      memory[2] = verb;

      while (memory[instructionPointer] !== 99) {
        const opcode = memory[instructionPointer];
        const parameter1 = memory[memory[instructionPointer + 1]];
        const parameter2 = memory[memory[instructionPointer + 2]];
        const parameter3 = memory[instructionPointer + 3];

        if (opcode === 1) {
          memory[parameter3] = parameter1 + parameter2;
        } else if (opcode === 2) {
          memory[parameter3] = parameter1 * parameter2;
        }

        instructionPointer += 4;
      }

      if (memory[0] === output) {
        return 100 * noun + verb;
      }
    }
  }
};
