var express = require('express');
var app = express();

app.get('/foobar', function (request, response, next) {
    response.send('Got foobar');
});

app.all('*', function (request, response, next) {
    response.send(request.method + ' to path ' + request.path);
});

app.listen(8080, () => console.log(`listening on port 8080`));