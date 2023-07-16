const http =require('http');
const fs = require('fs');
const _ =require('lodash');
//creating server
const server = http.createServer((req,res)=>{
    //lodash

    const num = _.random(0,20);
    console.log(num);
    const greet  = _.once(()=>{
        console.log("Hello");
    });
    greet();
    greet();
    console.log(req.url);
    //set header content type 
    res.setHeader('content-Type','text/html');
    //send an html file
    let path = './views/';
    switch(req.url){
        case '/':
            path+='index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path+='about.html';
            res.statusCode = 200;
            break;
        case  '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path+='404.html';
            res.statusCode = 404 ;
            break;
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            console.error(err);
        }else{
            // res.write(data);
            res.end(data);
        }
    })
    
}
);
//listening to server continuously
server.listen(3000,'localhost',()=>{
    console.log("listening for request on port 3000");
});