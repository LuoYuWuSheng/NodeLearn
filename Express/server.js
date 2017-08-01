/**
 * Computer user xd
 * Created by 张洋 on 2016/12/15.
 */

var express = require('express');
var search = require('./search');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoRoute = require('./routes/mongo');
var app = express();
var mongodb = require('mongodb');

var server = new mongodb.Server('127.0.0.1',27017);
var  client = new mongodb.MongoClient;

//链接数据库，如果这里想要使用前面的app该如何引用？通过this？
var db = new mongodb.Db('nodeLearn',server);

db.open(
    function (err, db) {
        if(err) throw  err;
        console.log('\033[96m利用db的open函数打开一个链接');
    }
);

/*
db.collection('users',function (err,collection) {
    if(err){
        console.log("访问collection 异常");
        //todo 为啥要new一下?
        throw new err;
    }
    app.users = collection;
});
 */

// 哈哈 express 也有模板引擎这么一说 和spring 一样
// app.set('view engine', 'ejs');

// 我猜这个__dirname 应该是次js文件所在的路径
app.set('views', __dirname + '/views');
//这个是为了匹配 express3 里的值
app.set('view options', {layout: false});


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//mongo 的路由
app.use('/mongo',mongoRoute);


app.get('/', function (req, res, next) {
    res.render('index.ejs');
    //todo render 之后再next竟然会有很奇怪的问题。不是很理解
    // next();
});

//定义 search 路由
app.get('/search', function (req, res, next) {
    search(req.query.q, function (err, tweets) {
        //错误处理直接将error 传递出去
        if (err) return next(err);
        res.render('search', {results: tweets, search: req.query.q});
    })
});
app.listen(3000);