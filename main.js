// const {MongoClient} = require("mongodb");
// const uri = "mongodb+srv://kerwinteh:SYQ12nBg1QZKjs1F@cluster0.wfkcgkb.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri);

var http = require('http');
var port = process.env.PORT || 3000;
var fs = require('fs');

http.createServer(function (req, res) {
    console.log("heelloo");
    if(req.url === "/process") {
        console.log("processpageeee");
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

    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write("THIS IS HOME PAGE");
    // var myReadStream = fs.createReadStream(__dirname + '/index.html', "utf8");
    // myReadStream.pipe(res);
}).listen(port);