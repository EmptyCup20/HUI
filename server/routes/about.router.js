/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var router = express.Router();

router.get('/', function (req, res) {
    res.render('about/about.ejs', {
        title: '关于我们'
    });
});

module.exports = router;