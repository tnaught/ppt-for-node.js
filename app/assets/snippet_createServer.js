var http = require('http');

http.createServer(function(req, res) {
    res.writeHeader(200, {'Content-type': 'text/plain'});
    res.write('Hello World!');
    res.end();
}).listen(1337, '127.0.0.1');