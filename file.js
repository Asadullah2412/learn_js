const fs = require("fs");


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


fs.appendFileSync('./text.txt', new Date().getDate().toLocaleString());