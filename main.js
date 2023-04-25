const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://kerwinteh:SYQ12nBg1QZKjs1F@cluster0.wfkcgkb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
var http = require('http');
var port = process.env.PORT || 3000;
var fs = require('fs');
var qs = require('querystring');


http.createServer(async function (req, res) {
    if (req.url === "/process") {
        //connect to mongo
        await connect();
        fs.readFile('data.html', async function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            //get user input
            let textinput = "";
            req.on('data', data => {
                textinput += data.toString();
            });

            req.on('end', async () => {
                textinput = qs.parse(textinput);
                await searchDb(textinput['name'], res, textinput['user']);
            });
        });
    } else {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }
}).listen(port);


async function searchDb(input, res, user) {
    const database = client.db("stockTicker");
    const collection = database.collection("companies");
    let result;
    if (user === "company") {
        result = await collection.find({name: input}).toArray();
        if (result.length === 0) {
            res.write("No results for: " + input);
        }
    } else {
        result = await collection.find({ticker: input}).toArray();
        if (result.length === 0) {
            res.write("No results for: " + input);
        }
    }

    for (let i = 0; i < result.length; i++) {
        res.write("Name: " + result[i].name);
        res.write("<br>");
        res.write("Ticker: " + result[i].ticker);
        res.write("<br>");
        res.write("<br>");
    }

    await client.close();
    res.end();
}


async function connect() {
    await client.connect();
    await client.db("stockTicker");
}