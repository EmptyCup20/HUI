/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var iconController = require("../../../controllers/resources/icon.controller.js");
var express = require("express");
var router = express.Router();

router.post("/del", iconController.delIcon);

router.get('/getIconsByCollection', iconController.getIconsByCollection);

module.exports = router;