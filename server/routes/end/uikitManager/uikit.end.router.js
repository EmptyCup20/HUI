/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var uikitCtrl = require("../../../controllers/uikit.controller.js");
var express = require("express");
var router = express.Router();

//------------------UIKIT管理------------------------//
router.get('/uikitInfo/:id', uikitCtrl.getUikitInfo);

router.put('/uikitInfo/:id', uikitCtrl.modify);

router.post('/uikitInfo', uikitCtrl.save);

router.post('/del', uikitCtrl.del);

router.get('/getUikitList', uikitCtrl.getUikitList);

module.exports = router;