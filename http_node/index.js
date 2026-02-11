const http = require('http');
const fs = require("fs");
const url = require("url")
const { defaultMaxListeners } = require('events');

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();

    const log = `${new Date().toISOString()} : ${req.method} ${req.url} new Req Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl)
    fs.appendFile('log.txt', log, (err, data) => {
        // res.end("Hello from Server Again")
        switch (myUrl.pathname) {
            case '/':
                res.end("Welcome to Homepage");
                break;

            case "/about":
                const username = myUrl.query.myname
                res.end(`HI , ${username}`);
                break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end("here are the results for " + search);
            default:
                res.end("404 not found bro 🧐")

        }

    })
});

myServer.listen(8000, () => console.log("Server started!"))