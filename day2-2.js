const fs = require('fs');
const readline = require('readline');

const Direction = {
    UP : "up",
    DOWN : "down",
    FORWARD : "forward"
}

class Command {
    direction;
    units;
    constructor(command) {
        const commandArray = command.split(' ');
        this.direction = commandArray[0];
        this.units = parseInt(commandArray[1]);
    }
}

class Submarine {
    depth = 0;
    position = 0;
    aim = 0;

    issueCommand(command) { // string
        if (command.direction == Direction.UP) {   
            this.aim -= command.units;
        } else if (command.direction == Direction.DOWN) {
            this.aim += command.units;
        } else if (command.direction == Direction.FORWARD) {
            this.position += command.units;
            this.depth += (this.aim * command.units);
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