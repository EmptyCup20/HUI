/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var router = express.Router();

router.get('/', function(req, res) {
    res.render('resource.ejs', {
        title: '资源库'
    });
});

module.exports = router;