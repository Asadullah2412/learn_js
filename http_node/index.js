const http = require('http');
const fs = require("fs");
const { defaultMaxListeners } = require('events');

const myServer = http.createServer((req, res) => {

    // console.log(req);
    // const log = `${Date.now()} : ${req.url} new Req Received\n`;
    const log = `${new Date().toISOString()} : new Req Received\n`;
    fs.appendFile('log.txt', log, (err, data) => {
        // res.end("Hello from Server Again")
        switch (req.url) {
            case '/':
                res.end("Welcome to Homepage");
                break;

            case "/about":
                res.end("I am Http Server on port 8000");
                break;
            default:
                res.end("404 not found bro 🧐")

        }

    })
});

myServer.listen(8000, () => console.log("Server started!"))