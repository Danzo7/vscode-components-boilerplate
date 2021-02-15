vm=require('vm');
fs=require("fs");
test=vm.runInThisContext(fs.readFileSync("test.js", 'utf8'));
console.log(test);