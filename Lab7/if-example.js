age = 30;

// Correct structure
if (age > 60) {
    savings_rate = 0.10;
} else if (age > 50) {
    savings_rate = 0.08;
} else if (age > 40) {
    savings_rate = 0.06;
} else {
    savings_rate = 0.05;
}

console.log ("1. My age is: " + age + " and my savings rate is: " + savings_rate);

// Another correct solution
if (age > 60) {
    savings_rate = 0.10;
}
if (age > 50 && age <=60) {
    savings_rate = 0.08;
}
if (age > 40 && age <=50) {
    savings_rate = 0.06;
}
if (age <= 40) {
    savings_rate = 0.05;
}

console.log ("2. My age is: " + age + " and my savings rate is: " + savings_rate);



// Incorrect structure
if (age > 60) {
    savings_rate = 0.10;
    if (age > 50) {
        savings_rate = 0.08;
        if (age > 40) {
            savings_rate = 0.06;
        } else {
            savings_rate = 0.05;
        }
    }
}

console.log ("3. My age is: " + age + " and my savings rate is: " + savings_rate);
