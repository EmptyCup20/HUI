/**
 * Created by zhengjunling on 2016/11/25.
 */
var icon_source = require("../controllers/icon.controller");
var express = require("express");
var router = express.Router();

router.get('/', function(req, res) {
    res.render('icon_upload.ejs', {
        title: '上传图标'
    });
});

//上传图标
router.post("/icon", icon_source.upload);

module.exports = router;