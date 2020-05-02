
// Asenna ensin express npm install express --save

var express = require('express');
var app=express();

var fs = require("fs");

let cookieParser = require('cookie-parser');

app.use(cookieParser());

var bodyParser = require('body-parser');
var customerController = require('./customerController');

const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;

let users = {
userName : "Testi",
loginTime : Date.now(),
sessionId : 1234
}

app.use(express.static(__dirname + '/public'));

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Staattiset filut
app.use(express.static('public'));

// REST API Asiakas
app.route('/Types')
    .get(customerController.fetchTypes);


app.route('/Asiakas')
    .get(customerController.fetchAll)
    .post(customerController.create);

app.route('/Asiakas/:id')
    .put(customerController.update)
    .delete(customerController.delete);
//

app.get('/login',(req, res) => {
    res.cookie("userData", users);
    res.send("Kayttaja lisatty")
});

app.get('/getuser',(req, res) => {
    console.log(req.cookies);
    res.send(req.cookies)
});

app.get('/logout',(req, res) => {
    res.clearCookie("userData");
    res.send("Kayttaja poistettu")
});

app.get('/', function (request, response) {
    let username = request.cookies['Testi'];
    if (!username || username.sessionId !== 1234) {
        console.log("Keksiä ei löydy, ohjataan tyhjälle sivulle");
        fs.readFile("jnode50-54/tyhjasivu.html", function (err, data) {
            response.writeHead(200, {'Content-Type' : 'text/html'});
                response.write(data);
                response.end();
            });
        } else if (username && username.sessionId === 1234) {
            console.log("Keksi löytyi idllä 1234, mennään käyttöliittymään");
            fs.readFile("jnode50-54/node.html", function (err, data) {
                response.writeHead(200, {'Content-Type' : 'text/html'});
                response.write(data);
                response.end();
            });
        }
    });
/*
app.get('/', function(request, response){
    fs.readFile("test.htm", function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();    
    });
*/    
    /*
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end("Terve maailma");
    */
    
// });
/*
app.get('/', function(request, response){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end("Terve maailma"); 
}); */

app.get('/maali', function(request, response){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end("Maalit 2-3"); 
});

app.route('/task')
    .get(function(request, response){
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end("Taskeja pukkaa");     
    }) /*
    .post(function(request, response){
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end("Taskeja pukkaa postista myöskin");     
    }); */

app.listen(port, hostname, () => {
  console.log(`Server running AT http://${hostname}:${port}/`);
});

/*
app.listen(port, () => {
    console.log(`Server running AT http://${port}/`);
  });
*/  