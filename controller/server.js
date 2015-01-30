var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var mime = require('./mime');
var route = require('./route');
var config = require('./config');
var queryString = require('querystring');

var server = http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    if(pathname == '/') {
        res.statusCode = 302;
        res.setHeader('Location', '/app/index');
        res.end();
        return;
    }
    var realPath;
    
    if(!route[pathname]) {
        //直接读取静态文件
        var ext = path.extname(pathname);
        realPath = path.normalize(config.basePath + pathname);

        fs.exists(realPath, function(exists) {
            if(!exists) {
                res.statusCode = 404;
                res.setHeader('Content-type', 'text/plain');
                res.end('this url:' + realPath + 'not found');
            }
            else {
                var ext = path.extname(realPath);
                if(ext) {
                    ext = ext.slice(1);
                }
                var contentType = 'text/plain';
                contentType = mime[ext] || 'text/plain';
                res.statusCode = 200;
                res.setHeader('Content-type', contentType);
                var raw = fs.createReadStream(realPath);
                raw.pipe(res);
            }
        })
    }
    else {
        var convertRoute = route[pathname].split('.');
        var fileName = convertRoute[0];
        var methodName = convertRoute[1];
        var controller = require('./'+ fileName);
        realPath = convertRoute.join('/');

        if(req.method == 'POST') {
            var data = '';
            req.on('data', function(chunk) {
                data += chunk;
            })
            req.on('end', function() {
                controller[methodName](realPath, res, queryString.parse(data));
            })
        }
        else {
            controller[methodName](realPath, res);
        }
    }
});
server.listen(3000, function() {
    console.log('listen to the port 3000');
});
