var base = require('./base');
var request = require('request');
var cheerio = require('cheerio');
var db = require('./db');

exports.createServer = function(path, res) {
    base.render(path, res);
};

exports.crawler = function(path, res) {
    var url = 'http://shouji.baidu.com/';
    request({
        url: url
    }, function(error, reponse, body) {
        if(!error && reponse.statusCode == 200) {
            var json = [];
            var $body = cheerio.load(body);
            var app = $body('.rec-main .app-box');
            app.each(function(i, v) {
                json.push({href: $body(v).attr('href')})
            })
            base.renderJson(res, JSON.stringify(json));
        }
        else {
            base.renderJson(res, JSON.stringify({
                status: 'error'
            }));
        }
    });
};

exports.blog = function(path, res) {
    base.render(path, res);
};

exports.postAdd = function(path, res) {
    base.render(path, res);
};

exports.savePost = function(path, res, data) {
    /*write mongo*/
    var re = {
        status: 'OK'
    };
    var post = new db.Post(data);
    post.save(function(err) {
        if(err) {
            re.status = 'ERROR';
        }
        base.renderJson(res, JSON.stringify(re));
    })
};

exports.getLatestPost = function(path, res) {
    /*按照修改时间排序，取第一条*/
    var re = {
        status: 'OK'
    };
    var q = db.Post.find().sort({uTime:-1}).limit(1);
    q.exec(function(err, posts) {
        if(err) {
            re.status = 'ERROR';
            re.data = '数据库读取错误!';
        }
        else {
            re.data = posts;
        }
        base.renderJson(res, JSON.stringify(re));
    })
};
