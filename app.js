var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var ConnectCas = require('node-cas-client');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemoryStore = require('session-memory-store')(session);
var url = require('url');
var userCtrl = require("./server/controllers/user.controller");
global.basePath = path.join(__dirname, '/');

app.set("view engine", "ejs");

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'app')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(session({
    name: 'NSESSIONID',
    secret: 'Hello I am a long long long secret',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        domain: "http://10.20.134.30"
    },
    store: new MemoryStore(),  // or other session store
    resave: false,
    saveUninitialized: true
}));

var casClient = new ConnectCas({
    debug: false,
    servicePrefix: 'http://localhost:7080',
    serverPath: 'https://sso.hikvision.com',
    paths: {
        validate: '/login/validate',
        serviceValidate: '/serviceValidate',
        proxy: '',
        login: '/login',
        logout: '/logout',
        proxyCallback: ''
    },
    match: [
        'login'
    ],
    redirect: function (req, res) {
        // 在redirect中， 根据是否有特殊cookie来决定是否跳走
        if (req.cookies.logoutFrom) {
            // 返回您想要重定向的路径
            return url.parse(req.cookies.logoutFrom).pathname;
        }
    },
    gateway: false,
    renew: false,
    slo: true,
    requestCert: true,
    rejectUnauthorized: false,
    restletIntegration: '',
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


//设置跨域访问
app.all('/admin/*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, accept, origin, content-type, x-access-token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

app.use('/', require('./server/routes/front/index.router.js'));
app.use('/design', require('./server/routes/front/design.router.js'));
app.use('/resource', require('./server/routes/front/resource.router.js'));
app.use('/article', require('./server/routes/front/article.router.js'));
app.use('/about', require('./server/routes/front/about.router.js'));
app.use('/login', require('./server/routes/login.router'));
app.use('/admin', userCtrl.userValid, require('./server/routes/end/admin.router.js'));
app.use('/logout', function (req, res) {
    var fromWhere = req.get('Referer');
    var fromWhereUri = url.parse(fromWhere);

    // 根据来源判断是否是你不希望用户注销后登陆的页面，如果是的话，设置设置cookie
    //if (fromWhereUri.pathname.match(/the page you dont want user to login after logout/)) {
    res.cookie('logoutFrom', fromWhereUri.pathname);
    //}
    casClient.logout()(req, res);
});
app.use('/user', require('./server/routes/user.router'));

console.log("server model : " + ( process.env.MODEL ? "-" + process.env.MODEL : "-dev"))

var server = app.listen(7080, function () {
    console.log("Connect to mongoDB success!");
});

server.on('error', function (err) {
    console.log(err);
});
