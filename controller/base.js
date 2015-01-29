var config = require('../lib/config');
var fs = require('fs');
var l_path = require('path'); 

/*html render*/
exports.render = function(path, res) {
    var realPath = l_path.normalize(config.basePath + path + '.html');
    fs.exists(realPath, function(exists) {
        if(!exists) {
            res.statusCode = 404;
            res.setHeader('Content-type', 'text/plain');
            res.end('this url:' + realPath + ' not found');
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/html');
            var raw = fs.createReadStream(realPath);
            raw.pipe(res);
        }
    })
};

/*json render*/
exports.renderJson = function(res, json) {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json, charset=utf-8');
    res.write(json);
    res.end();
};