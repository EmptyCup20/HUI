/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var uikitCtrl = require("../../../controllers/uikit.controller.js");
var express = require("express");
var router = express.Router();

//------------------UIKIT管理------------------------//
router.get('/getContent', uikitCtrl.getContent);

router.post('/modify', uikitCtrl.modify);

module.exports = router;