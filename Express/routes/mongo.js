/**
 * Computer user xd
 * Created by 张洋 on 2016/12/16.
 */
var exports = require('express');
var route = exports.Router();
var MongoClient = require('mongodb').MongoClient;
//todo 没有这个数据库也能链接？为啥
var url = 'mongodb://localhost:27017/nodeLearn';
var assert = require('assert');

var mongoGlobal = {};

//db 对象不能展开吗？
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log('链接 数据库成功 ！');
    mongoGlobal.DataBase = db;
    db.on('timeout', function () {
        console.log("链接超时了");
    });
});

route.get(
    '/',
    function (req, res) {
        res.render('index.pug', {authenticate: false});
    }
);

// 没有post方法不应该立刻返回404吗？怎么会一直pandding
route.post(
    '/login',
    function (req, res) {
        console.log("用户登录 表单内容 : " + JSON.stringify(req.body));
        var formUser = req.body.user;
        var collection = mongoGlobal.DataBase.collection('users');
        var userLogin = collection.findOne({email: formUser.email}, function (err, doc) {
            if (doc != null && doc.passwd == formUser.passwd) {
                console.log('log in success');
                var authenticate = {me: doc};
                // res.end(JSON.stringify(authenticate));
                res.render('index.pug', {authenticate:authenticate});
            } else {
                res.render('index.pug', null);
            }
        });
    }
);

route.get(
    '/login',
    function (req, res) {
        console.log("login actin received");
        res.render('login.pug');
    }
);

route.get(
    '/signup',
    function (req, res) {
        //todo 这里需要存储数据库
    }
);

module.exports = route;