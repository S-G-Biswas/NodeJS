

//3. External Module

const isEven = require("is-even")

// We have installed a external module called is-even using npm install is-event 

let a = process.argv[2]

//Normal method for checking the isEven
// a%2==0?console.log(true):console.log(false)

//Using External Module is-even
console.log(isEven(a))



