/*
Purpose: 
Date:
Author:
*/

// Load required packages
var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");
var filename = "./user_data.json";
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({secret: "MySecretKey", resave: true, saveUninitialized: true}));
app.use(cookieParser());
app.use(myParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

var num_users = 0;  // Total number of users on the site

if (fs.existsSync(filename)) {
    data = fs.readFileSync(filename, 'utf-8');

    user_data = JSON.parse(data);
    console.log("User_data=", user_data);

    fileStats = fs.statSync(filename);
    console.log("File " + filename + " has " + fileStats.size + " characters");
} else {
    console.log("Enter the correct filename bozo!");
}

app.get("/", function (request, response) {
    if (request.session.page_views) {
       request.session.page_views++;
       response.send("Welcome back.  This is vist # " + request.session.page_views);
    } else {
        request.session.page_views = 1;
        response.send("Welcome to this page for the first time!");
    }
}
);

app.get("/set_cookie", function (request, response) {
    my_name = "Rick Kazman";

    response.cookie("My Name", my_name, {maxAge: 8000}).send("Cookie sent");
}
);

app.get("/get_cookie", function (request, response) {
    //console.log("Cookies=" + request.cookies);
    my_cookie_name = request.cookies["My Name"];
    response.send("User " + my_cookie_name + " recognized");
}
);

app.get('/set_session', function (req, res, next) {
    res.send(`welcome, your session ID is ${req.session.id}`);
    next();
});

app.get("/use_session", function (request, response) {
    response.send("Your session ID is " + request.session.id);
    request.session.destroy();
}
);

app.get("/fav_color", function (request, response) {
    // Give a simple login form 
    str = `<body>
<form action="/fav_color" method="POST">
<input type="text" name="color" size="40" placeholder="enter favorite color" ><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});


app.get("/logout", function (request, response) {
    num_users--;
    request.session.destroy();
    response.cookie("username", "", {maxAge: 1000});

    response.send("Thanks for shopping with us!");
}
);
app.post("/fav_color", function (request, response) {
    var POST = request.body;
    request.session.fav_color = POST["color"];
    response.send("Fav color is " + request.session.fav_color);
}
);

app.get("/login", function (request, response) {
    // Give a simple login form
    if (typeof request.session['last_login'] != "undefined") {
        login_time = "Last login was " + request.session["last_login"];
    } else {
        login_time = "First login";
    }
    my_cookie_name = request.cookies["username"];

    str = `<body>
    Login info: ${login_time} by ${my_cookie_name} Total users: ${num_users}
<form action="/login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    POST = request.body;
    user_name_from_form = POST["username"];
    if (user_data[user_name_from_form] != undefined) {
        if (typeof request.session.last_login != 'undefined')
        {
            var msg = `You last logged in: ${request.session.last_login}. Your fav color is ${POST["color"]}`;
            var now = new Date();
        } else {
            var msg = '';
            var now = 'first visit';
        }
        request.session.last_login = now;
        request.session.fav_color = POST["color"];
        response.cookie('username', user_name_from_form).send(`${msg} <BR>${user_name_from_form} logged in: ${now}`);
        num_users++;
    } else {
        response.send(`Sorry Charlie!`);
    }
});

app.get("/fav_color", function (request, response) {
    response.send("Favorite color is: " + request.session.fav_color);
}
);

app.listen(8080, () => console.log(`listening on port 8080`));