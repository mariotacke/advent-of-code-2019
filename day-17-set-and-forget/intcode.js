const POSITION_MODE = 0;
const IMMEDIATE_MODE = 1;
const RELATIVE_MODE = 2;

const ADD = 1;
const MULTIPLY = 2;
const RECEIVE = 3;
const SEND = 4;
const JUMP_IF_NOT_ZERO = 5;
const JUMP_IF_ZERO = 6;
const LESS_THAN = 7;
const EQUALS = 8;
const ADJUST_RELATIVE_BASE = 9;

module.exports = (program, input = []) => {
  const memory = [...program];

  let instructionPointer = 0;
  let relativeBase = 0;
  let output = [];

  const getValue = (parameterMode, position) => {
    switch (parameterMode) {
      case POSITION_MODE:
        return memory[memory[position]];
      case IMMEDIATE_MODE:
        return memory[position];
      case RELATIVE_MODE:
        return memory[memory[position] + relativeBase];
    }
  };

  const getAddress = (parameterMode, position) => {
    if (parameterMode === POSITION_MODE) {
      return memory[position];
    } else if (parameterMode === RELATIVE_MODE) {
      return memory[position] + relativeBase;
    }
  };

  while (memory[instructionPointer] !== 99) {
    const instruction = `${memory[instructionPointer]}`.padStart(5, '0');

    const opcode = Number(instruction.slice(3));
    const parameter1Mode = Number(instruction[2]);
    const parameter2Mode = Number(instruction[1]);
    const parameter3Mode = Number(instruction[0]);

    if (opcode === ADD) {
      const parameter1 = getValue(parameter1Mode, instructionPointer + 1);
      const parameter2 = getValue(parameter2Mode, instructionPointer + 2);
      const parameter3 = getAddress(parameter3Mode, instructionPointer + 3);

      memory[parameter3] = parameter1 + parameter2;

      instructionPointer += 4;
    } else if (opcode === MULTIPLY) {
      const parameter1 = getValue(parameter1Mode, instructionPointer + 1);
      const parameter2 = getValue(parameter2Mode, instructionPointer + 2);
      const parameter3 = getAddress(parameter3Mode, instructionPointer + 3);

      memory[parameter3] = parameter1 * parameter2;

      instructionPointer += 4;
    } else if (opcode === RECEIVE) {
      const parameter1 = getAddress(parameter1Mode, instructionPointer + 1);

      memory[parameter1] = input.shift();

      instructionPointer += 2;
    } else if (opcode === SEND) {
      output.push(getValue(parameter1Mode, instructionPointer + 1));

      instructionPointer += 2;
    } else if (opcode === JUMP_IF_NOT_ZERO) {
      const parameter1 = getValue(parameter1Mode, instructionPointer + 1);
      const parameter2 = getValue(parameter2Mode, instructionPointer + 2);

      if (parameter1 !== 0) {
        instructionPointer = parameter2;
      } else {
        instructionPointer += 3;
      }
    } else if (opcode === JUMP_IF_ZERO) {
      const parameter1 = getValue(parameter1Mode, instructionPointer + 1);
      const parameter2 = getValue(parameter2Mode, instructionPointer + 2);

      if (parameter1 === 0) {
        instructionPointer = parameter2;
      } else {
        instructionPointer += 3;
      }
    } else if (opcode === LESS_THAN) {
      const parameter1 = getValue(parameter1Mode, instructionPointer + 1);
      const parameter2 = getValue(parameter2Mode, instructionPointer + 2);
      const parameter3 = getAddress(parameter3Mode, instructionPointer + 3);

      memory[parameter3] = parameter1 < parameter2 ? 1 : 0;

      instructionPointer += 4;
    } else if (opcode === EQUALS) {
      const parameter1 = getValue(parameter1Mode, instructionPointer + 1);
      const parameter2 = getValue(parameter2Mode, instructionPointer + 2);
      const parameter3 = getAddress(parameter3Mode, instructionPointer + 3);

      memory[parameter3] = parameter1 === parameter2 ? 1 : 0;

      instructionPointer += 4;
    } else if (opcode === ADJUST_RELATIVE_BASE) {
      const parameter1 = getValue(parameter1Mode, instructionPointer + 1);

      relativeBase += parameter1;

      instructionPointer += 2;
    }
  }

  return output;
};
