/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var uploadCtrl = require("../../../controllers/resources/upload.controller.js");
var express = require("express");
var router = express.Router();

/**
 * 资源上传管理
 */
router.post('/imgUpload', uploadCtrl.imgUpload);

router.post('/iconUpload', uploadCtrl.iconUpload);

module.exports = router;