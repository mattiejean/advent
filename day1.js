const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('input/day1.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    const readStack = []    
    let increaseCount = 0;

    for await (const line of rl) {
        currentValue = parseInt(line);
        if (readStack.length > 0) {
            if (readStack.pop() < currentValue) {
                increaseCount++;
            }
        }
        readStack.push(currentValue);
    }
    console.log(increaseCount);
}

processLineByLine();