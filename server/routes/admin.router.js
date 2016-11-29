/**
 * Created by zhengjunling on 2016/11/25.
 */
var icon_source = require("../controllers/icon.controller");
var express = require("express");
var router = express.Router();

router.get('/upload', function(req, res) {
    res.render('admin/icon_upload.ejs', {
        title: '上传图标'
    });
});

//上传图标
router.post("/iconUpload", icon_source.upload);

router.post("/icon/add", icon_source.add);

module.exports = router;