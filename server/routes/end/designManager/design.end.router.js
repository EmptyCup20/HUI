/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var designController = require("../../../controllers/design.controller.js");
var express = require("express");
var router = express.Router();

router.get('/:type', designController.getDocInfo);

router.post('/modify', designController.modify);

module.exports = router;