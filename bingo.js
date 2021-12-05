class DrawNumbers {
    numbers;
    constructor(numbersStr) { // comma separated string
        this.numbers = numbersStr.split(',');
    }
}

class Board {
    boardValues = []; // array
    winBuckets = {};
    numbersMap = {};
    playedNumbers = {};
    winningNumber = 0;
    constructor() {

    }
    pushColumn(column) {
        this.boardValues.push(column);
    }
    init() {
        this.boardWidth = this.boardValues[0].length // they will all be the same
        this.rowCount = this.boardValues.length // should always be five (add validation - for now we assume good data)
        for (let column = 0; column < this.boardWidth; column++) {
            for (let row = 0; row < this.rowCount; row++) {
                const boardPosition = { column, row };
                this.numbersMap[this.boardValues[column][row]] = boardPosition;
            }
        }
    }
    playNumber(number) { // returns false for no bingo - true for BINGO!!!!
        const boardPosition = this.numbersMap[number];
        if (this.winningNumber) {
            return false;
        }
        if (boardPosition) {
            this.playedNumbers[number] = number;
            const columnKey = `column-${boardPosition.column}`;
            const rowKey = `row-${boardPosition.row}`;
            if (!this.winBuckets[columnKey]) {
                this.winBuckets[columnKey] = 1;
            } else {
                this.winBuckets[columnKey] += 1;
                if (this.winBuckets[columnKey] === this.boardWidth) {
                    this.winningNumber = parseInt(number);
                    return true;
                }
            }
            if (!this.winBuckets[rowKey]) {
                this.winBuckets[rowKey] = 1;
            } else {
                this.winBuckets[rowKey] += 1;
                if (this.winBuckets[rowKey] === this.rowCount) {
                    this.winningNumber = number;
                    return true;
                }
            }
        }
        return false;
    }
    score() {
        let score = 0;
        this.boardValues.forEach((column) => {
            column.forEach((number) => {
                if (!this.playedNumbers[number]) {
                    score += parseInt(number);
                }
            })
        })            
        return score * this.winningNumber;
    }

}

class Bingo {
    numbers;
    boards;
    constructor(numbers, boards) {
        this.numbers = numbers;
        this.boards = boards;
    }
    play() {
        let winningBoard;
        this.numbers.numbers.some(number => {
            return this.boards.boards.some(board => {
                if (board.playNumber(number)) {
                    winningBoard = board;
                    return true;
                }
                return false;
            })
        });
        return winningBoard;
    }
    playForLast() {
        let winningBoard;
        this.numbers.numbers.forEach(number => {
            return this.boards.boards.forEach(board => {
                if (board.playNumber(number)) {
                    winningBoard = board;                    
                }
            })
        });
        return winningBoard;
    }
}

class Boards {
    boards = [];
    constructor(inputArray) {
        let line = inputArray.shift();

        let board;
        while (line !== undefined) {
            let lineValues = line.split(" ").filter(function (e) { return e.trim().length > 0; });
            if (line.length === 0) {
                if (board) {
                    board.init()
                    this.boards.push(board);                    
                }
                board = new Board();
            } else {
                board.pushColumn(lineValues);
            }
            line = inputArray.shift();
        }
        this.boards.push(board);
    }
}

module.exports.DrawNumbers = DrawNumbers;
module.exports.Board = Board;
module.exports.Boards = Boards;
module.exports.Bingo = Bingo;