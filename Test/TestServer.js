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
    if (typeof req.body['Submit'] != 'undefined') {
        for (key in req.body) {
            console.log("Key=" + key);
            console.log("Value=" + req.body[key]);
            if (req.body[key] == "Tyler") {
                res.send("Found him!");
                break;
            } else {
                res.send("I couldn't find Tyler :(");
            }
        }
        
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));