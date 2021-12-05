const fs = require('fs');
const readline = require('readline');

var flipbits = function (v, digits) {
    return ~v & (Math.pow(2, digits) - 1);
}

async function processLineByLine() {
    const fileStream = fs.createReadStream('input/day3.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let results = []
    for await (const line of rl) {
        reading = line.split("");
        for (let i = 0; i < reading.length; i++) {
            if (!results[i]) {
                results[i] = 0;
            }
            results[i] += reading[i] === "0" ? -1 : 1
        }
    }
    let gammaString = "";
    for (let i = 0; i < results.length; i++) {
        gammaString += results[i] > 0 ? "1" : "0";
    }

    const gamma = parseInt(gammaString, 2);
    const epison = flipbits(gamma, results.length);
    console.log(gamma * epison);
}

processLineByLine();