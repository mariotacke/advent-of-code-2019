const { EventEmitter } = require('events');

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
const HALT = 99;

const PADDLE = 3;
const BALL = 4;

class Breakout extends EventEmitter {
  constructor (program) {
    super();

    this.memory = [...program];
    this.instructionPointer = 0;
    this.relativeBase = 0;
    this.input = [];
    this.output = [];
    this.score;
    this.paused = false;
    this.paddlePositionX = 0;
    this.ballPositionX = 0;

    this.resolution = {
      width: 42,
      height: 20,
    };

    this._tilemap = {
      0: ' ',
      1: '█',
      2: '#',
      3: '-',
      4: 'o',
    };

    this.frame = Array
      .from({ length: this.resolution.height })
      .map(() => Array
        .from({ length: this.resolution.width })
        .map(() => 0));
  }

  _getValue(parameterMode, position) {
    switch (parameterMode) {
      case POSITION_MODE:
        return this.memory[this.memory[position]];
      case IMMEDIATE_MODE:
        return this.memory[position];
      case RELATIVE_MODE:
        return this.memory[this.memory[position] + this.relativeBase];
    }
  }

  _getAddress(parameterMode, position) {
    if (parameterMode === POSITION_MODE) {
      return this.memory[position];
    } else if (parameterMode === RELATIVE_MODE) {
      return this.memory[position] + this.relativeBase;
    }
  }

  paint() {
    return this.frame
      .map((row) => row
        .map((tile) => this._tilemap[tile])
        .join(''))
      .join('\n');
  }

  joystick(key) {
    this.input = [key === 'left' ? -1 : key === 'right' ? 1 : 0];
  }

  run() {
    this.paused = false;

    while (!this.paused) {
      const instruction = `${this.memory[this.instructionPointer]}`.padStart(5, '0');

      const opcode = Number(instruction.slice(3));
      const parameter1Mode = Number(instruction[2]);
      const parameter2Mode = Number(instruction[1]);
      const parameter3Mode = Number(instruction[0]);

      if (opcode === ADD) {
        const parameter1 = this._getValue(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this._getValue(parameter2Mode, this.instructionPointer + 2);
        const parameter3 = this._getAddress(parameter3Mode, this.instructionPointer + 3);

        this.memory[parameter3] = parameter1 + parameter2;

        this.instructionPointer += 4;
      } else if (opcode === MULTIPLY) {
        const parameter1 = this._getValue(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this._getValue(parameter2Mode, this.instructionPointer + 2);
        const parameter3 = this._getAddress(parameter3Mode, this.instructionPointer + 3);

        this.memory[parameter3] = parameter1 * parameter2;

        this.instructionPointer += 4;
      } else if (opcode === RECEIVE) {
        const parameter1 = this._getAddress(parameter1Mode, this.instructionPointer + 1);

        if (this.paddlePositionX < this.ballPositionX) {
          this.joystick('right');
        } else if (this.paddlePositionX > this.ballPositionX) {
          this.joystick('left');
        } else {
          this.joystick('up');
        }

        this.memory[parameter1] = this.input.shift();

        this.instructionPointer += 2;
      } else if (opcode === SEND) {
        this.output.push(this._getValue(parameter1Mode, this.instructionPointer + 1));

        if (this.output.length === 3) {
          if (this.output[0] === -1) {
            this.score = this.output[2];

            this.emit('score', this.score);

            const frame = this.paint();

            this.emit('frame', frame);
          } else {
            const [x, y, type] = this.output;

            this.frame[y][x] = type;

            if (type === BALL) {
              this.ballPositionX = x;
            } else if (type === PADDLE) {
              this.paddlePositionX = x;
            }
          }

          this.output = [];
        }

        this.instructionPointer += 2;
      } else if (opcode === JUMP_IF_NOT_ZERO) {
        const parameter1 = this._getValue(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this._getValue(parameter2Mode, this.instructionPointer + 2);

        if (parameter1 !== 0) {
          this.instructionPointer = parameter2;
        } else {
          this.instructionPointer += 3;
        }
      } else if (opcode === JUMP_IF_ZERO) {
        const parameter1 = this._getValue(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this._getValue(parameter2Mode, this.instructionPointer + 2);

        if (parameter1 === 0) {
          this.instructionPointer = parameter2;
        } else {
          this.instructionPointer += 3;
        }
      } else if (opcode === LESS_THAN) {
        const parameter1 = this._getValue(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this._getValue(parameter2Mode, this.instructionPointer + 2);
        const parameter3 = this._getAddress(parameter3Mode, this.instructionPointer + 3);

        this.memory[parameter3] = parameter1 < parameter2 ? 1 : 0;

        this.instructionPointer += 4;
      } else if (opcode === EQUALS) {
        const parameter1 = this._getValue(parameter1Mode, this.instructionPointer + 1);
        const parameter2 = this._getValue(parameter2Mode, this.instructionPointer + 2);
        const parameter3 = this._getAddress(parameter3Mode, this.instructionPointer + 3);

        this.memory[parameter3] = parameter1 === parameter2 ? 1 : 0;

        this.instructionPointer += 4;
      } else if (opcode === ADJUST_RELATIVE_BASE) {
        const parameter1 = this._getValue(parameter1Mode, this.instructionPointer + 1);

        this.relativeBase += parameter1;

        this.instructionPointer += 2;
      } else if (opcode === HALT) {
        this.emit('game-over');

        this.paused = true;

        break;
      }
    }
  }
}

module.exports = Breakout;
