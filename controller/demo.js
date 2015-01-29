var base = require('./base');
var request = require('request');
var cheerio = require('cheerio');

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
    base.renderJson(res, JSON.stringify(re));
};
