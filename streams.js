const fs =require('fs');
const readStream = fs.createReadStream('./docs/blog3.txt',{encoding:'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');
// readStream.on('data',(chunk)=>{
//     console.log("new chunk__________________________________________________________________________________________________________");
//     console.log(chunk);
//     writeStream.write('\nNEW CHUNk INCOMING\n');
//     writeStream.write(chunk);
// });
readStream.on('data',(chunk)=>{
    console.log("hi");
writeStream.write(chunk.toUpperCase());
});
//readStream.pipe(writeStream);