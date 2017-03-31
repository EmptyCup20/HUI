/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var iconCltCtrl = require("../../../controllers/resources/iconCollection.controller.js");
var express = require("express");
var router = express.Router();

//获取图标库列表
router.get('/getIconCollection', iconCltCtrl.getCollection);

//获取图标库基本信息
router.get('/getIconCollectionInfo/:id', iconCltCtrl.getCollectionInfo);

//添加图标库
router.post('/addIconCollection', iconCltCtrl.addCollection);

//批量删除图标库
router.post('/delIconCollection', iconCltCtrl.delCollection);

//更新图标库基本信息
router.post('/updateIconCollection', iconCltCtrl.updateCollection);

//上传/更新psd附件
router.post('/uploadAttachment', iconCltCtrl.uploadAttachment);

module.exports = router;