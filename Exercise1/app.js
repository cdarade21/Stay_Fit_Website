var fs = require('fs');
var http = require('http');


fs.readFile('./public/views/viewTextInBrowser.txt','utf8',function(err,data){

  if (err) throw err;
    var server = http.createServer(function(req,res){
    console.log('request was made:' + req.url);
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end(data);
  });

  server.listen(8080, '127.0.0.1');
  console.log('Now listening to port 8080');
});
