'use strict';
require('express-namespace');
var express = require('express');
var open = require('open');
var bodyParser = require('body-parser');

var routerNews = require('./routes/news');
var routerUser = require('./routes/user');
var routerComment = require('./routes/comment');

var http = require('http');
var path = require('path');
var settings = require('./settings');

var mongoose = require('mongoose');


var fds = require('./model/fds');
var db = mongoose.connection;

//打开数据库
mongoose.connect('mongodb://localhost/ease');
db.on('error', function (err) {
    console.log(err);
});
db.once('open', function () {
    console.log('mongodb opened!');
});

//运行express服务器
var app = express();
app.set('uploadDir', './tmp');
app.use(express.static(path.join(__dirname, '../www')));
app.use(bodyParser.json());

app.listen(settings.port);
console.log('listening '+settings.port);

if ('development' === app.get('env')) {
    app.set('showStackError', true)

    app.locals.pretty = true
    mongoose.set('debug', true)
}

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

routerNews(app);
routerUser(app);
routerComment(app);


 app.get('/',function(req,res){
 res.sendFile(path.join(__dirname,'../www/index.html'));
 });

//fds.insetNewsList();
fds.run();










