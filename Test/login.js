var express = require('express');
var app = express();

app.use(express.urlencoded({ extended: true }));

var fs = require('fs');
var fname = "users.json";
var status = fs.statSync(fname);
console.log("File " + fname + " has size: " + status.size);

if (fs.existsSync(fname)) {
    data = fs.readFileSync(fname, 'utf-8');
    users = JSON.parse(data);
    console.log("Users:" + users); 
} else {
    console.log("Couldn't find " + fname);
}

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
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
    user_name = POST["username"];
    user_pass = POST["password"];
    console.log("User name=" + user_name + " password=" + user_pass);

    if (users[user_name] != undefined) {
        if (users[user_name].password == user_pass) {
            // Good login
            response.send(user_name + " is logged in");
        } else {
            // Bad login, redirect
            response.redirect("/login");
        }
    } else {
        // Bad username
        response.redirect("Bad username " + user_name);
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));