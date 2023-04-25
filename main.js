const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://kerwinteh:SYQ12nBg1QZKjs1F@cluster0.wfkcgkb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
var http = require('http');
var port = process.env.PORT || 3000;
var fs = require('fs');
var qs = require('querystring');


http.createServer(async function (req, res) {
    // if (req.url === "/process") {
    //     fs.readFile('data.html',function (err, data){
    //         res.write("THIS IS PROCESS PAGE");
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.write("data" + data);
    //         res.end();
    //     });
    // } else {
    //     fs.readFile('index.html',function (err, data){
    //         res.write("index.html fillee");
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.write("data" + data);
    //         res.end();
    //     });
    // }

    // fs.readFile('index.html',function (err, data){
    //     res.write("index.html fillee");
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write("data" + data);
    //     res.end();
    // });

    //
    // if (req.url === "/process") {
    //     await client.connect();
    //     await client.db("stockTicker");
    //     console.log("connected to server");
    //
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write("THIS IS PROCESS PAGE");
    //     var myReadStream = fs.createReadStream(__dirname + '/data.html', "utf8");
    //     myReadStream.pipe(res);
    //     myReadStream.on('data', function (chunk) {
    //         console.log(chunk.toString());
    //     });
    // } else {
    //     console.log("HOME PAGEEE");
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write("HOME PAGE, PICK A STOCK");
    //     var myReadStream = fs.createReadStream(__dirname + '/index.html', "utf8");
    //     myReadStream.pipe(res);
    // }


    if (req.url === "/process") {
        //connect to mongo
        await connect();
        fs.readFile('data.html', async function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            //get user input
            let textinput = "";
            req.on('data', data => {
                console.log(data.toString());
                textinput += data.toString();
            });
            console.log("textInput:" + textinput);

            req.on('end', () => {
                textinput = qs.parse(textinput);
                console.log(textinput);
                console.log("textinput['name']: " + textinput['name']);
                console.log("textinput['user']: " + textinput['user']);
                searchDb(textinput['name'], res, textinput['user'] === "company");
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

function searchDb(name, res, user){
    const database = client.db("stockTicker");
    var testColl = database.collection('companies');
    testColl.insertOne({ foo: 'bar' });
    testColl.find({}).toArray(function (err, docs) {
        if(docs==null) res.write("NULL");

        else res.write("docs" + docs);
    });

    // const database = client.db("stockTicker");
    // const collection = database.collection("companies");
    // collection.findOne({}, function (err,result){
    //     if (err) throw err;
    //     res.write(result);
    // });
    // if(user) {
    //     console.log("name" + name);
    //     res.write(name);
    //     // res.write(user);
    //     // var query = { name: name };
    //
    //     res.write("beforeee");
    //
    //     collection.find(user ? {"name": name} : {"ticker": name + "\r"}).toArray(async function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //
    //         if (result.length === 0) {
    //             res.write("No results for: " + name)
    //         }
    //
    //         res.write("resuilt" + result);
    //         res.write("inside");
    //         await client.close();
    //     });


        // collection.findOne({}, function (err, result){
        //     if (err) throw err;
        //     res.write(result);
        //     console.log(result);
        //     res.write("inside");
        // })

    //     res.write("aftersecond");
    // }
}

async function connect() {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("stockTicker");
    console.log("Connected successfully to server");
}


// const mongoose = require('mongoose');
// function mongoose_connect()
// {
//     const url =""; // usual connection string goes here
//     mongoose.connect(url,{ useUnifiedTopology: true,
//         useNewUrlParser: true, useCreateIndex:true });
//     const db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'error:'));
//     db.once('open', function() {
//         console.log("success!");
//         Books.find(function (err, mybooks) {
//             if (err) return console.error(err);
//             for (i=0; i<mybooks.length; i++)
//                 console.log(mybooks[i].show());
//             db.close();
//         }); // end find
//     }); //end db once
// } //end function
// mongoose_connect();