var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

global.rootPath = path.join(__dirname, 'app/');

app.set("view engine", "ejs");

app.set('views', path.join(__dirname, 'app/views'));

app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./server/routes/index.router'));
app.use('/index', require('./server/routes/index.router'));
app.use('/resource', require('./server/routes/resource.router'));
app.use('/login', require('./server/routes/login.router'));
app.use('/admin', require('./server/routes/admin.router'));

app.use('/user', require('./server/routes/user.router'));

var server = app.listen(7080, function () {
    var host = server.address().address;
    var port = server.address().port;
});
