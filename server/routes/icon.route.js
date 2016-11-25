/**
 * Created by zhengjunling on 2016/11/25.
 */
var icon_source = require("../controllers/icon.controller");
var express = require("express");
var router = express.Router();
var path = require('path');
router.get("/", function(req,res){
    res.sendFile(path.resolve(__dirname, '../../app/views/icon_upload.html'));
});
//上传图标
router.post("/icon", icon_source.upload);

module.exports = router;