// Example of exporting a function
module.exports = function isNonNegativeInteger (queryString, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(queryString) != queryString) errors.push('Not a number!'); // Check if string is a number value
    if(queryString < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(queryString) != queryString) errors.push('Not an integer!'); // Check that it is an integer
    
    if (returnErrors) {
        return errors;
    } else if (errors.length == 0) {
        return true;
    } else {
        return false;
    }
}
