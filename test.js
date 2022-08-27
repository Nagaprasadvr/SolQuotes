var readline = require('readline');
var r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var input;
r.question('Type...:', function (blog) {
    input = blog;
    console.log("blog: ".concat(blog));
});
console.log("input:" + input);
r.close();
