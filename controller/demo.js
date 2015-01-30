var base = require('./base');
var request = require('request');
var cheerio = require('cheerio');
var db = require('./db');

exports.createServer = function(path, res) {
    base.render(path, res);
};

exports.crawler = function(path, res) {
    var url = 'http://play.google.com';
    var proxy = 'http://q.gfw.li:36105';
    request({
        url: url,
        proxy: proxy
    }, function(error, reponse, body) {
        if(!error && reponse.statusCode == 200) {
            var json = [];
            var $body = cheerio.load(body);
            var appHref = $body('.nav-container .apps a').attr('href');
            request({
                url: url + appHref,
                proxy: proxy
            }, function(error, response, body) {
                if(!error && reponse.statusCode == 200) {
                    var $appbody = cheerio.load(body);
                    $appbody('.card-list .card').each(function(i, element) {
                        var title = $appbody(element).find('.title').attr('title');
                        var href = $appbody(element).find('.title').attr('href');
                        json.push({
                            title: title,
                            href: href
                        })
                    });
                    base.renderJson(res, JSON.stringify(json));
                }
                else {
                    console.log(error);
                }
            })
        }
        else {
            console.log(error)
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
