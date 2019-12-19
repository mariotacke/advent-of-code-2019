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

const directions = {
  1: 'north',
  north: 1,
  2: 'south',
  south: 2,
  3: 'west',
  west: 3,
  4: 'east',
  east: 4,
};

const statuses = ['█', '.', 'o'];

const getOpposite = (direction) =>
  direction === 'west'
    ? 'east'
    : direction === 'east'
      ? 'west'
      : direction === 'north'
        ? 'south'
        : 'north';

class RepairDroid {
  constructor (program) {
    this.memory = [...program];
    this.instructionPointer = 0;
    this.relativeBase = 0;
    this.input = [];
    this.output = [];
    this.paused = false;
    this.lastMoveCommand = null;

    this.position = {
      x: 0,
      y: 0,
    };

    this._map = new Map();
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

  move(commands = []) {
    this.input = commands.map((direction) => directions[direction]);

    return this._run();
  }

  lookAround(lastDirection) {
    const directions = ['north', 'east', 'south', 'west'];
    const possibleDirections = [];

    directions.forEach((direction) => {
      const opposite = getOpposite(direction);
      const status = this.move([direction]);

      if (status !== 0) {
        if (!lastDirection || direction !== getOpposite(lastDirection)) {
          possibleDirections.push(direction);
        }

        this.move([opposite]);
      }
    });

    return possibleDirections;
  }

  print() {
    const dimensions = [...this._map.keys()].reduce((points, key) => {
      const [x, y] = key.split(',').map(Number);

      if (x < points.minX) points.minX = x;
      if (x > points.maxX) points.maxX = x;
      if (y < points.minY) points.minY = y;
      if (y > points.maxY) points.maxY = y;

      return points;
    }, { minX: 0, maxX: 0, minY: 0, maxY: 0 });

    const dx = Math.abs(dimensions.minX);
    const dy = Math.abs(dimensions.minY);
    const width = Math.abs(dimensions.minX - dimensions.maxX) + 1;
    const height = Math.abs(dimensions.minY - dimensions.maxY) + 1;

    const maze = Array
      .from({ length: height })
      .map(() => Array
        .from({ length: width }).map(() => '+'));

    [...this._map.entries()].forEach(([key, value]) => {
      const [x, y] = key.split(',').map(Number);
      const status = statuses[value];

      maze[y + dy][x + dx] = status;
    });

    maze[this.position.y + dy][this.position.x + dx] = 'X';

    return maze
      .map((row) => row.join(''))
      .join('\n');
  }

  _getRelativeCoordinate(direction) {
    switch (directions[direction]) {
      case ('north'):
        return { x: this.position.x, y: this.position.y - 1 };
      case ('south'):
        return { x: this.position.x, y: this.position.y + 1 };
      case ('west'):
        return { x: this.position.x - 1, y: this.position.y };
      case ('east'):
        return { x: this.position.x + 1, y: this.position.y };
    }
  }

  _run() {
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

        this.memory[parameter1] = this.input.pop();
        this.lastMoveCommand = this.memory[parameter1];

        this.instructionPointer += 2;
      } else if (opcode === SEND) {
        const status = this._getValue(parameter1Mode, this.instructionPointer + 1);
        const position = this._getRelativeCoordinate(this.lastMoveCommand);

        this.instructionPointer += 2;

        this._map.set(`${position.x},${position.y}`, status);

        if (status !== 0) {
          this.position = position;
        }

        if (!this.input.length) {
          this.paused = true;

          return status;
        }
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
        this.paused = true;

        return null;
      }
    }
  }
}

module.exports = RepairDroid;
