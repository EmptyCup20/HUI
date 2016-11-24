/**
 * Created by zhengjunling on 2016/11/24.
 */
var express = require("express");
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render("index", {title: "Express"});
});

router.get("/index", function (req, res, next) {
    res.render("index");
});

module.exports = router;