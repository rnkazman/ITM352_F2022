var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.get('/test', function(req, res, next) {
    res.send('Request routed to test: ' + req.path);
}) ;

app.all('*', function (request, response, next) {
    response.send(request.method + ' to path= ' + request.path);
});



app.listen(8080, () => console.log(`listening on port 8080`)); 
// note the use of an anonymous function here to do a callback