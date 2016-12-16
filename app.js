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

app.use('/', require('./server/routes/front/index.router.js'));
app.use('/index', require('./server/routes/front/index.router.js'));
app.use('/design', require('./server/routes/front/design.router.js'));
app.use('/resource', require('./server/routes/front/resource.router.js'));
app.use('/works', require('./server/routes/front/works.router.js'));
app.use('/about', require('./server/routes/front/about.router.js'));
app.use('/login', require('./server/routes/login.router'));
app.use('/admin', require('./server/routes/end/admin.router.js'));

app.use('/user', require('./server/routes/user.router'));

console.log("server model : " + ( process.env.MODEL ? "-" + process.env.MODEL : "-dev"))

var server = app.listen(7080, function () {});
