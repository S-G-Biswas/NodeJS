

//1. Inbuilt Module

const os = require("os");

// const [add,sub] = require("./main")

//Note :-  with array method in importing modules the imorting oredr should be the same as the exporting order ,like we are exporting add first then sub from main.js , now in the index.js file if i import sub first and then add , then the add will works like sub and sub will work like add.( This is not a right way)Instead of this we can use objects to solve this issue, becoz in objects we don't have concepts of index.

const {add,sub} = require("./main")






// console.log(os)
// console.log(os.freemem())
// console.log(os.totalmem())

console.log(add(10,20))
console.log(sub(10,20))

//Q1. if the user is passing totalmem show the total memory, if the user passing freemem  then show the free memory

// let user_input = process.argv[2];

// user_input ==="totalMem"?console.log(os.totalmem()):user_input ==="freeMem"?console.log(os.freemem()):console.log("Wrong Input")