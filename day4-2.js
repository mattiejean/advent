const fs = require('fs');
const readline = require('readline');

const bingo = require('./bingo.js');


async function processLineByLine() {
    const fileStream = fs.createReadStream('input/day4.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const lines = []
    for await (const line of rl) {
        lines.push(line)
    }

    const numbers = new bingo.DrawNumbers(lines.shift());

    const boards = new bingo.Boards(lines);

    const game = new bingo.Bingo(numbers, boards);
    const winningBoard = game.playForLast();
    if (winningBoard) {
        console.log("BINGO!!!!");
        console.log(winningBoard.score());
    } else {
        console.log("no winner");
    }

}

processLineByLine();