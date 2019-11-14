var http = require('http');

function cb(req, res){
    res.statusCode = 200;
    res.end("Hello form the application");
}

function cb2(req, res){
    res.statusCode = 200;
    res.end("Hello form second app");
}

var app = http.createServer(cb);
app.listen(3000);

var app2 = http.createServer(cb2);
app2.listen(3001);



