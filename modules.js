//importing doesn't give access to things inside that file
const {people,ages } = require('./people');

console.log(people,'\n',ages);
const os = require('os');
console.log(os.platform(),os.homedir());