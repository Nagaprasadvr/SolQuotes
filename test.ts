const readline = require('readline');
const r = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
let input:string;
r.question('Type...:',function(blog:string){
     input = blog
     console.log(`blog: ${blog}`);
     

});

console.log("input:"+input);
r.close();