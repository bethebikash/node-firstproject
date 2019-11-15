// var http = require('http');

// function cb(req, res){
//     res.statusCode = 200;
//     res.end("Hello form the application");
// }

// function cb2(req, res){
//     res.statusCode = 200;
//     res.end("Hello form second app");
// }

// var app = http.createServer(cb);
// app.listen(3000);

// var app2 = http.createServer(cb2);
// app2.listen(3001);




// express

// const express = require('express');

// const app = express()


// app.get('/registration', function(req, res) {
//     console.log('in registration');
//     var x = {name: "Bikash"}
//     res.status(200)
//     res.set({
//         'Content-Type': 'application/json'
//     })
//     res.send('hello')
// })
// app.listen(3002);

// const express = require('express');

// const app = express()


// middleware

const express = require('express');

const app = express()

app.get('/booking', function(req, res, next) {
    console.log('in first middleware do something');
    next();
},

function(req, res, next){
    console.log('in the second middleware');
    var x = {name: "Bikash"}
    res.status(200)
    res.set({
        'Content-Type': 'application/json'
    })
    res.send('hello')
})
app.listen(3003);




