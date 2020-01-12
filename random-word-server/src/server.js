const express = require("express");
const cors = require("cors");
const fs = require("fs");
const serverless = require("serverless-http");

const app = express();

const router = express.Router();

const port = process.env.PORT || 3030;

app.use(
    cors({
        origin: "http://obscure-fortress-88963.herokuapp.com",
        credentials: true
    })
);

// read words from json file
const fileContents = fs.readFileSync("./five-letter-words.json", "utf-8");
const words = JSON.parse(fileContents);
const { fiveLetterWords } = words;

router.get("/", (req, res) => {
    // select a random word
    const word =
        fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];

    // return it as the response
    res.send(word);
});

app.use("/.netlify/functions/server", router);

app.listen(port, () => console.log(`Word server listening on port ${port}!`));

module.exports.handler = serverless(app);
