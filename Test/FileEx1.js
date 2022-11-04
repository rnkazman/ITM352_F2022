//var user_data = require("./users.json");
//console.log(user_data);

var fs = require('fs');

var fname = "users.json";

var status = fs.statSync(fname);
console.log ("File " + fname + " has size: " + status.size);

if (fs.existsSync(fname)) {
    var users = fs.readFileSync(fname, 'utf-8');
    // console.log("Users:" + users); 
} else {
    console.log("Couldn't find " + fname);
}



