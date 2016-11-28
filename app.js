var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.set("view engine", "ejs");

app.set('views', path.join(__dirname, 'app/views'));

app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./server/routes/index.router'));
app.use('/login', require('./server/routes/login.router'));
app.use('/upload', require('./server/routes/icon.router'));

app.use('/user', require('./server/routes/user.router'));

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
});
