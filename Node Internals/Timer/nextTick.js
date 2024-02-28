
// 1. Using process.nextTick() for a delayed function:

function delayedFunction() {
    console.log("Function executed after 2 seconds");
}

process.nextTick(() => {
    setTimeout(delayedFunction, 2000);
});
