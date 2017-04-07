var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var ConnectCas = require('node-cas-client');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemoryStore = require('session-memory-store')(session);
global.basePath = path.join(__dirname, '/');

app.set("view engine", "ejs");

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'app')));
app.use(logger('dev'));

app.use(cookieParser());
app.use(session({
    name: 'NSESSIONID',
    secret: 'Hello I am a long long long secret',
    store: new MemoryStore()  // or other session store
}));

var casClient = new ConnectCas({
    debug: false,
    servicePrefix: 'http://localhost:7080',
    serverPath: 'https://ssouat.hikvision.com',
    paths: {
        validate: '/login/validate',
        serviceValidate: '/serviceValidate',
        proxy:'',
        login: '/login',
        logout: '/logout',
        proxyCallback: ''
    },
    match: [
        'api',
        'login'
    ],
    redirect: false,
    gateway: false,
    renew: false,
    slo: true,
    requestCert: true,
    rejectUnauthorized: false,
    restletIntegration:'',
    cache: {
        enable: false,
        ttl: 5 * 60 * 1000,
        filter: []
    },
    fromAjax: {
        header: 'x-client-ajax',
        status: 418
    }
});

app.use(casClient.core());

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
app.use('/design', require('./server/routes/front/design.router.js'));
app.use('/resource', require('./server/routes/front/resource.router.js'));
app.use('/article', require('./server/routes/front/article.router.js'));
app.use('/about', require('./server/routes/front/about.router.js'));
app.use('/login', require('./server/routes/login.router'));
app.use('/admin', require('./server/routes/end/admin.router.js'));
app.use('/logout', casClient.logout());
app.use('/user', require('./server/routes/user.router'));

console.log("server model : " + ( process.env.MODEL ? "-" + process.env.MODEL : "-dev"))

var server = app.listen(7080, function () {
    console.log("Connect to mongoDB success!");
});

server.on('error', function (err) {
    console.log(err);
});
