var express = require('express');
var path = require('path');
var app = express();
var iconRouter = require('./server/routes/icon.route');
var indexRouter = require('./server/routes/index.router');

app.use(express.static(path.join(__dirname, 'app')));

app.use('/', indexRouter);
app.use('/upload',iconRouter);

var server = app.listen(7080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
