const fs = require('fs');
const readline = require('readline');

function processReadings(readings, bit, comparator) {
    if (readings.length === 1) {
        return readings[0];
    }
    const zeroBucket = [];
    const oneBucket = [];
    let bitCount = 0;
    for (let i = 0; i < readings.length; i++) {
        reading = readings[i].split("");
        bitValue = reading[bit];
        if (bitValue === "0") {
            bitCount--;
            zeroBucket.push(readings[i]);
        } else {
            bitCount++;
            oneBucket.push(readings[i]);
        }
    }
    if (comparator(bitCount)) {
        return processReadings(zeroBucket, ++bit, comparator);
    } else {
        return processReadings(oneBucket, ++bit, comparator);
    }
}

async function processLineByLine() {
    const fileStream = fs.createReadStream('input/day3.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const readings = [];
    for await (const line of rl) {
        readings.push(line);
    }

    o2 = processReadings(readings, 0, (c) => c < 0);
    co2 = processReadings(readings, 0, (c) => c >= 0);
    o2Int = parseInt(o2,2);
    co2Int = parseInt(co2,2);
    console.log(o2Int * co2Int);

}

processLineByLine();