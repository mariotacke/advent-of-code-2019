module.exports = (instructions, input = 5) => {
  const initialMemoryState = instructions.split(',');

  const memory = [...initialMemoryState];

  let instructionPointer = 0;
  let output = '0';

  const getParameter = (parameterMode, position) => {
    return parameterMode === 0 ? memory[memory[position]] : memory[position];
  };

  while (Number(memory[instructionPointer]) !== 99) {
    const instruction = memory[instructionPointer].padStart(5, '0');

    const opcode = Number(instruction.slice(3));
    const parameter1Mode = Number(instruction[2]);
    const parameter2Mode = Number(instruction[1]);
    const parameter3Mode = Number(instruction[0]); // eslint-disable-line no-unused-vars

    if (opcode === 1) {
      const parameter1 = getParameter(parameter1Mode, instructionPointer + 1);
      const parameter2 = getParameter(parameter2Mode, instructionPointer + 2);
      const parameter3 = memory[instructionPointer + 3];

      memory[parameter3] = `${Number(parameter1) + Number(parameter2)}`;

      instructionPointer += 4;
    } else if (opcode === 2) {
      const parameter1 = getParameter(parameter1Mode, instructionPointer + 1);
      const parameter2 = getParameter(parameter2Mode, instructionPointer + 2);
      const parameter3 = memory[instructionPointer + 3];

      memory[parameter3] = `${Number(parameter1) * Number(parameter2)}`;

      instructionPointer += 4;
    } else if (opcode === 3) {
      const parameter1 = memory[instructionPointer + 1];

      memory[parameter1] = `${input}`;

      instructionPointer += 2;
    } else if (opcode === 4) {
      output = getParameter(parameter1Mode, instructionPointer + 1);

      instructionPointer += 2;
    } else if (opcode === 5) {
      const parameter1 = getParameter(parameter1Mode, instructionPointer + 1);
      const parameter2 = getParameter(parameter2Mode, instructionPointer + 2);

      if (Number(parameter1) !== 0) {
        instructionPointer = Number(parameter2);
      } else {
        instructionPointer += 3;
      }
    } else if (opcode === 6) {
      const parameter1 = getParameter(parameter1Mode, instructionPointer + 1);
      const parameter2 = getParameter(parameter2Mode, instructionPointer + 2);

      if (Number(parameter1) === 0) {
        instructionPointer = Number(parameter2);
      } else {
        instructionPointer += 3;
      }
    } else if (opcode === 7) {
      const parameter1 = getParameter(parameter1Mode, instructionPointer + 1);
      const parameter2 = getParameter(parameter2Mode, instructionPointer + 2);
      const parameter3 = memory[instructionPointer + 3];

      memory[parameter3] = Number(parameter1) < Number(parameter2) ? '1' : '0';

      instructionPointer += 4;
    } else if (opcode === 8) {
      const parameter1 = getParameter(parameter1Mode, instructionPointer + 1);
      const parameter2 = getParameter(parameter2Mode, instructionPointer + 2);
      const parameter3 = memory[instructionPointer + 3];

      memory[parameter3] = Number(parameter1) === Number(parameter2) ? '1' : '0';

      instructionPointer += 4;
    }
  }

  return output;
};
