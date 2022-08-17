const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
let app = express();
const PORT = 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let data = {}

function fileExists(path) {
    try {
        fs.accessSync(path);
    } catch (error) {
        return false;
    }
    return true;
}

function writeToFile() {
    const content = JSON.stringify(data);
    fs.writeFile('output.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

function getAllDataFromFile() {
    // returns JSON that we will need to read json.parse()
        if (!fileExists('output.txt')) {
            fs.writeFileSync("output.txt", "{}");
        }
        data = JSON.parse(fs.readFileSync('output.txt', 'utf8'));
}
getAllDataFromFile();

function getKeyAndValueFromUrl(urlString) {
    let keyValueFromUrl = urlString.split("?")[1].split("=");
    let key = keyValueFromUrl[0];
    let value = keyValueFromUrl[1];

    let kv = { "key": key, "value": value }
    return kv;
}

app.get("/", (request, response) => response.status(200).send("You're at the root! :)"))

app.get("/set", (req, res) => {
    let kv = getKeyAndValueFromUrl(req.url);
    data[kv["key"]] = kv["value"];
    console.log(data);
    writeToFile();
    res.status(200).json(kv);
})

app.get("/get", (req, res) => {
    let keyFromUrl = req.url.split("?")[1];


    let returnValue = data[keyFromUrl];
    res.json({ "key from URL": keyFromUrl, "value": returnValue });
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))

module.exports = app
