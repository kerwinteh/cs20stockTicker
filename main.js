const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://kerwinteh:SYQ12nBg1QZKjs1F@cluster0.wfkcgkb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
var http = require('http');
var port = process.env.PORT || 3000;
var fs = require('fs');


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
        file = 'data.html';
        //read in result.html file
        fs.readFile(file, async function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            //get user input
            textinput = "";
            req.on('data', data => {
                textinput += data.toString();
            });
            res.write(textinput);

            req.on('end', () => {
                console.log("END");
                //parse user input
                // textinput = qs.parse(textinput);
                //search for it in the db
                // search(textinput['the_name'], res, textinput['user'] === "company");
            });
        });
    } else {
        file = 'index.html';
        //read in index.html file
        fs.readFile(file, function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }
}).listen(port);



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