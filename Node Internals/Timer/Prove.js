

//3. Proving the order of execution of event loop phases:

console.log("Start of the script");

// Using process.nextTick()
process.nextTick(() => console.log("process.nextTick callback"));

// Using Promise
Promise.resolve().then(() => console.log("Promise resolved"));

// Using setTimeout
setTimeout(() => console.log("setTimeout callback"), 0);

// Using setInterval
setInterval(() => console.log("setInterval callback"), 1000);

// Using setImmediate
setImmediate(() => console.log("setImmediate callback"));

//  file reading
const fs = require('fs');
fs.readFile(__filename, () => console.log("File reading callback"));

console.log("End of the script");
