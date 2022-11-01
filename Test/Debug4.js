var express = require('express');
var app = express();

app.use(express.urlencoded({ extended: true })); 

app.get('/', function(req,res) {
    res.send(
        `<form action="/process_form" method="POST">
            Name1: <input  name="name1"><br>
            Name2: <input  name="name2"><br>
            <input type="submit" name="Submit" value="Send POST Request">
        </form>`
        );
});

app.post('/process_form', function(req, res) {
    let POST = req.body;
    console.log(POST);
    let found = false;
    
    if (typeof POST['Submit'] != 'undefined') {
        for (value in req.body) {
            console.log("Value=" + value);
            console.log("POST[value]=" + POST[value]);
            if (POST[value] == "Tyler") {
                res.send("Found him!");
                found = true;
            }
        }
        if (!found) res.send("I couldn't find Tyler :(");
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));