const { exit } = require("process");

require("./products_data.js"); 

var num_products = 5;
var count = 1;

while (count <= num_products) {
    prod_name = eval ('name' + count);
    if (count > num_products/2) {
        console.log("Don't ask!");
        process.exit();
    }
    if (count > num_products/4 && count < num_products*3/4) {
        console.log(prod_name + " is sold out!");
        count++;
        continue;
    }
    console.log("Got product " + count + ". " + prod_name);
    count++;
}

console.log ("That's all we have!");