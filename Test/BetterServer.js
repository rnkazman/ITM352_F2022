var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/public');

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path= ' + request.path);
    next();
});

app.get('/test', function(req, res, next) {
    res.send('Request routed to test: ' + req.path);
}) ;

app.post("/process_form", function (request, response) {
    console.log("Got process form");
    response.type('txt') ;
    response.send(request.body); 
 });




 
app.listen(8080, () => console.log(`listening on port 8080`)); 
// note the use of an anonymous function here to do a callback