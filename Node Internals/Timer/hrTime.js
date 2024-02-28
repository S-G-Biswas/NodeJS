

//2. Measuring execution time using process.hrtime():

function calculateSum() {
    let sum = 0;
    for (let i = 1; i <= 1000000; i++) {
        sum += i;
    }
    console.log("Sum:", sum);
}

const startTime = process.hrtime();
calculateSum();
const endTime = process.hrtime(startTime);

console.log("Execution time:", endTime[0] * 1e9 + endTime[1], "nanoseconds");
