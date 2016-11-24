var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'app')));

app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/views/index.html'));
})

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
