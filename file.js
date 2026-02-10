const fs = require("fs");
const os = require("os")

console.log(os.cpus().length)

// fs.writeFileSync("./text.txt", "my first node file");


// const result = fs.readFileSync('./text.txt', 'utf-8');
// console.log(result);

// fs.readFile('./text.txt', 'utf-8', (err, result) => {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log(result)
//     }
// })


// fs.appendFileSync('./text.txt', new Date().getDate().toLocaleString());

// blocking
// console.log('1')
// const result = fs.readFileSync('./text.txt', 'utf-8');
// console.log(result);

// console.log('2')


// NON blocking

console.log('1')
fs.readFile('text.txt', 'utf-8', (err, result) => {
    console.log(result)
})

console.log('2')