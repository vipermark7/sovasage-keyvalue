const express = require("express");
const bodyParser = require('body-parser');
let app = express();
const PORT = 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let data = []

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
    data.push(kv)
    res.status(200).json(kv);
})

app.get("/get", (req, res) => {
    let keyFromUrl = req.url.split("?")[1];

    let returnValue = data.find(item => item["key"] === keyFromUrl)["value"]
    res.json({ "key from URL": keyFromUrl, "value": returnValue });
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))

module.exports = app
