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

var products = require(__dirname + '/product_data.json');

app.get("/product_data.js", function (request, response, next) {
    response.type('.js');
    var products_str = `var products = ${JSON.stringify(products)};`;
    response.send(products_str);
});

app.get('/test', function (req, res, next) {
    res.send('Request routed to test: ' + req.path);
});

app.post("/process_form", function (request, response) {
    console.log("Got process form");
    var q = request.body['quantity_textbox'];
    let brand = products[0]['brand'];
    let brand_price = products[0]['price'];

    response.send(`<h2>Thank you for purchasing ${q} ${brand}. Your total is \$${q * brand_price}!</h2>`);
});





app.listen(8080, () => console.log(`listening on port 8080`));
// note the use of an anonymous function here to do a callback