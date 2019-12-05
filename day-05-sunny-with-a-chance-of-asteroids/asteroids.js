module.exports = (instructions, input = 1) => {
  const initialMemoryState = instructions.split(',');

  const memory = [...initialMemoryState];

  let instructionPointer = 0;
  let output = '0';

  while (Number(memory[instructionPointer]) !== 99) {
    const instruction = memory[instructionPointer].padStart(4, '0');

    const opcode = Number(instruction.slice(2));
    const parameter1Mode = Number(instruction[1]);
    const parameter2Mode = Number(instruction[0]);

    if (opcode === 1) {
      const parameter1 = parameter1Mode === 0 ? memory[memory[instructionPointer + 1]] : memory[instructionPointer + 1];
      const parameter2 = parameter2Mode === 0 ? memory[memory[instructionPointer + 2]] : memory[instructionPointer + 2];
      const parameter3 = memory[instructionPointer + 3];

      memory[parameter3] = `${Number(parameter1) + Number(parameter2)}`;

      instructionPointer += 4;
    } else if (opcode === 2) {
      const parameter1 = parameter1Mode === 0 ? memory[memory[instructionPointer + 1]] : memory[instructionPointer + 1];
      const parameter2 = parameter2Mode === 0 ? memory[memory[instructionPointer + 2]] : memory[instructionPointer + 2];
      const parameter3 = memory[instructionPointer + 3];

      memory[parameter3] = `${Number(parameter1) * Number(parameter2)}`;

      instructionPointer += 4;
    } else if (opcode === 3) {
      const parameter1 = memory[instructionPointer + 1];

      memory[parameter1] = `${input}`;

      instructionPointer += 2;
    } else if (opcode === 4) {
      output = parameter1Mode === 0 ? memory[memory[instructionPointer + 1]] : memory[instructionPointer + 1];

      instructionPointer += 2;
    }
  }

  return output;
};
