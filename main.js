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
    

    if (req.url === "/process") {
        await client.connect();
        await client.db("stockTicker");
        console.log("connected to server");

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("THIS IS PROCESS PAGE");
        var myReadStream = fs.createReadStream(__dirname + '/data.html', "utf8");
        myReadStream.pipe(res);
    } else {
        console.log("HOME PAGEEE");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("HOME PAGE, PICK A STOCK");
        var myReadStream = fs.createReadStream(__dirname + '/index.html', "utf8");
        myReadStream.pipe(res);
    }
}).listen(port);





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