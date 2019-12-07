class AmplifierController {
  constructor (instructions, phase) {
    this.memory = instructions.split(',');
    this.inputs = [phase];
    this.instructionPointer = 0;
    this.terminated = false;
  }

  getParameter (parameterMode, position) {
    return parameterMode === 0
      ? this.memory[this.memory[position]]
      : this.memory[position];
  }

  run (input) {
    const { memory, inputs } = this;

    inputs.push(input);

    let output = null;

    while (!this.terminated) {
      const instruction = memory[this.instructionPointer].padStart(5, '0');

      const opcode = Number(instruction.slice(3));
      const parameter1Mode = Number(instruction[2]);
      const parameter2Mode = Number(instruction[1]);
      const parameter3Mode = Number(instruction[0]); // eslint-disable-line no-unused-vars

      if (opcode === 1) {
        const parameter1 = this.getParameter(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this.getParameter(parameter2Mode, this.instructionPointer + 2);
        const parameter3 = memory[this.instructionPointer + 3];

        memory[parameter3] = `${Number(parameter1) + Number(parameter2)}`;

        this.instructionPointer += 4;
      } else if (opcode === 2) {
        const parameter1 = this.getParameter(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this.getParameter(parameter2Mode, this.instructionPointer + 2);
        const parameter3 = memory[this.instructionPointer + 3];

        memory[parameter3] = `${Number(parameter1) * Number(parameter2)}`;

        this.instructionPointer += 4;
      } else if (opcode === 3) {
        const parameter1 = memory[this.instructionPointer + 1];

        memory[parameter1] = `${inputs.shift()}`;

        this.instructionPointer += 2;
      } else if (opcode === 4) {
        output = this.getParameter(parameter1Mode, this.instructionPointer + 1);

        this.instructionPointer += 2;

        break;
      } else if (opcode === 5) {
        const parameter1 = this.getParameter(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this.getParameter(parameter2Mode, this.instructionPointer + 2);

        if (Number(parameter1) !== 0) {
          this.instructionPointer = Number(parameter2);
        } else {
          this.instructionPointer += 3;
        }
      } else if (opcode === 6) {
        const parameter1 = this.getParameter(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this.getParameter(parameter2Mode, this.instructionPointer + 2);

        if (Number(parameter1) === 0) {
          this.instructionPointer = Number(parameter2);
        } else {
          this.instructionPointer += 3;
        }
      } else if (opcode === 7) {
        const parameter1 = this.getParameter(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this.getParameter(parameter2Mode, this.instructionPointer + 2);
        const parameter3 = memory[this.instructionPointer + 3];

        memory[parameter3] = Number(parameter1) < Number(parameter2) ? '1' : '0';

        this.instructionPointer += 4;
      } else if (opcode === 8) {
        const parameter1 = this.getParameter(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this.getParameter(parameter2Mode, this.instructionPointer + 2);
        const parameter3 = memory[this.instructionPointer + 3];

        memory[parameter3] = Number(parameter1) === Number(parameter2) ? '1' : '0';

        this.instructionPointer += 4;
      } else if (opcode === 99) {
        this.terminated = true;
      }
    }

    return output;
  }
}

module.exports = AmplifierController;
