/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var router = express.Router();

router.get('/', function (req, res) {
    res.render('front-end/front-end.ejs', {
        model: 'front-end'
    });
});

module.exports = router;