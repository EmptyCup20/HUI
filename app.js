var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');

global.basePath = path.join(__dirname, '/');

app.set("view engine", "ejs");

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'app')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//设置跨域访问
app.all('/admin/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, accept, origin, content-type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    //res.header("Access-Control-Max-Age: 86400");
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/', require('./server/routes/front/index.router.js'));
app.use('/index', require('./server/routes/front/index.router.js'));
app.use('/design', require('./server/routes/front/design.router.js'));
app.use('/resource', require('./server/routes/front/resource.router.js'));
app.use('/artical', require('./server/routes/front/artical.router.js'));
app.use('/about', require('./server/routes/front/about.router.js'));
app.use('/login', require('./server/routes/login.router'));
app.use('/admin', require('./server/routes/end/admin.router.js'));

app.use('/user', require('./server/routes/user.router'));

console.log("server model : " + ( process.env.MODEL ? "-" + process.env.MODEL : "-dev"))

var server = app.listen(7080, function () {
    console.log("Connect to mongoDB success!");
});

server.on('error', function (err) {
    console.log(err);
});
