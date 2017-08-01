/**
 * Computer user xd
 * Created by 张洋 on 2016/12/14.
 */
var connect = require('connect');
var fs = require('fs');
var http = require('http');
var timmer = require('./request-time');


var server = connect.createServer();

server.use(connect.logger('dev'));
server.use(timmer({time: 500}));

server.use(function (req, res, next) {
        if ('/a' == req.url) {
            res.writeHead(200);
            res.end('Fast');
        } else next();
    }
);

server.use(function (req, res, next) {
        if ('/b' == req.url) {
            setTimeout(
                function () {
                    res.writeHead(200);
                    res.end('slow');
                }, 1000);
        } else next();
    }
);
/*
// 中间件顺序谁来确定的
server.use(function (req, res, next) {
    if ('get' == req.method && '/index.html' == req.address.substr(0, 7));
    res.write('hahahah');
    next();
});
*/
// server.use();
server.listen(1111);