var http = require('http');
var port = process.env.PORT || 3000;
var fs = require('fs');

// console.log("This goes to the console window");

http.createServer(function (req, res) {
    console.log("request made: " + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/index.html', "utf8");
    myReadStream.pipe(res);
    // res.write("<h2>Hello World</h2>");
    // res.write ("Success!  This app is deployed offline");
    // res.end();
}).listen(port);