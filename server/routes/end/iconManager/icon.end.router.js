/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var iconController = require("../../../controllers/resources/icon.controller.js");
var express = require("express");
var router = express.Router();

/**
 * 图片管理页, 所有图片
 */
router.get('/all', iconController.getAllIcons);

router.post("/add", iconController.addIcon);

router.post("/del", iconController.delIcon);

router.get('/getIconsByCollection', iconController.getIconsByCollection);

module.exports = router;