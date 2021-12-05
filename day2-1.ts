const fs = require('fs');
const readline = require('readline');

enum Direction {
    UP = "up",
    DOWN = "down",
    FORWARD = "forward",
    BACKWARD = "backward"
}

class Command {
    direction: Direction;
    units: number;
    constructor(command : string) {
        const commandArray = command.split(' ');
        this.direction = commandArray[0] as Direction;
        this.units = parseInt(commandArray[1]);
    }
}

class Submarine {
    depth = 0;
    position = 0;
    
    issueCommand(command : Command) { // string
        if (command.direction == Direction.UP) {
            this.depth -= command.units;
        } else if (command.direction == Direction.DOWN) {
            this.depth += command.units;
        } else if (command.direction == Direction.FORWARD) {
            this.position += command.units
        }
    }

}

async function processLineByLine() {
    const fileStream = fs.createReadStream('input/day2.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    const sub = new Submarine()
    for await (const line of rl) {
       sub.issueCommand(new Command(line));
    }
    console.log(sub.depth * sub.position);
}

processLineByLine();