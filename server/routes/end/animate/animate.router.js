var express = require("express");
var animateCtrl = require("../../../controllers/animate.controller");
var router = express.Router();

router.get('/animateInfo/:id', animateCtrl.getAnimateInfo);

router.put('/animateInfo/:id', animateCtrl.modify);

router.post('/animateInfo', animateCtrl.saveAnimate);

router.post('/delAnimate', animateCtrl.delAnimate);

router.get('/getAnimateList', animateCtrl.getAnimateList);

//上传附件
router.post('/uploadCoverPic', animateCtrl.uploadCoverPic);

//上传附件
router.post('/uploadAttachment', animateCtrl.uploadAttachment);

module.exports = router;