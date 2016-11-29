/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var router = express.Router();

router.get('/', function (req, res) {
    res.render('works/works.ejs', {
        model: 'works'
    });
});

module.exports = router;