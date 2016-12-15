/**
 * Created by zhengjunling on 2016/11/25.
 */
var express = require("express");
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index.ejs', {
        model: 'index'
    });
});

module.exports = router;