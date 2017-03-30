var express = require("express");
var animateCtrl = require("../../../controllers/animate.controller");
var router = express.Router();

router.get('/getAnimateList', animateCtrl.getAnimateList);

module.exports = router;