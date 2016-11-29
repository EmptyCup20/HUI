
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('user/login.ejs', {
        title: '登录'
    });
});

module.exports = router;