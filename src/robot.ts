const validDirections = ["NORTH", "EAST", "SOUTH", "WEST"];
const placementError = "PLACE command invalid";
const commandError = "COMMAND invalid";

class RobotError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class Robot {
  commands: string[];
  coords: string[];
  x: number;
  y: number;
  direction: string;
  errMessage: string;
  shouldReport: boolean;

  constructor(input: string) {
    this.commands = input.split("\n");
    this.x = 0;
    this.y = 0;
    this.direction = "";
    this.shouldReport = this.setShouldReport();
    this.errMessage = "";
    this.coords = this.place();

    try {
      this.validate();
      this.cycleCommands();
    } catch (err) {
      const robotError = err as RobotError;
      this.errMessage = robotError.message;
    }
  }
  validateInputCoords() {
    if (this.coords.length < 1) {
      throw new RobotError(placementError);
    }

    var decimalRegExp = /^\d+$/;

    const [x, y] = this.coords;

    if (!x.match(decimalRegExp) || !y.match(decimalRegExp)) {
      throw new RobotError(placementError);
    }
  }

  setCoords() {
    const [x, y, direction] = this.coords;
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.direction = direction;
  }

  validateAxisRange() {
    if (this.x < 0 || this.x > 4 || this.y < 0 || this.y > 4) {
      throw new RobotError(placementError);
    }
  }

  validateDirection() {
    if (!validDirections.includes(this.direction)) {
      throw new RobotError(placementError);
    }
  }

  validate() {
    this.validateInputCoords();
    this.setCoords();
    this.validateAxisRange();
    this.validateDirection();
  }

  setShouldReport() {
    return this.commands[this.commands.length - 1] === "REPORT";
  }

  cycleCommands() {
    this.commands.shift();
    for (let command of this.commands) {
      this.action(command);
    }
  }

  action(command: string) {
    switch (command) {
      case "MOVE":
        this.move();
        break;
      case "LEFT":
        this.left();
        break;
      case "RIGHT":
        this.right();
        break;
      case "REPORT":
        this.report();
        break;
      default:
        throw new RobotError(commandError);
    }
  }

  right() {
    const index = validDirections.indexOf(this.direction);
    this.direction = validDirections[index === 3 ? 0 : index + 1];
  }

  left() {
    const index = validDirections.indexOf(this.direction);
    this.direction = validDirections[index === 0 ? 3 : index - 1];
  }

  report() {
    if (this.shouldReport) {
      return `${this.x},${this.y},${this.direction}`;
    }
    return "";
  }

  move() {
    switch (this.direction) {
      case "NORTH":
        if (this.y < 4) {
          this.y += 1;
        }
        break;
      case "SOUTH":
        if (this.y > 0) {
          this.y -= 1;
        }
        break;
      case "EAST":
        if (this.x < 4) {
          this.x += 1;
        }
        break;
      case "WEST":
        if (this.x > 0) {
          this.x -= 1;
        }
        break;
    }
  }

  place(): string[] {
    const placeCommand = this.commands[0].split(" ");
    if (placeCommand[0] !== "PLACE") {
      return [];
    }
    if (placeCommand.length > 1) {
      return placeCommand[1].split(",");
    }
    return [];
  }
}
