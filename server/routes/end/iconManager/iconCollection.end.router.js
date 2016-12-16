/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var iconCltCtrl = require("../../../controllers/resources/iconCollection.controller.js");
var express = require("express");
var router = express.Router();

router.get('/collectionManage', iconCltCtrl.render);

router.get('/collectionAdd', iconCltCtrl.collectionAddRender);

router.get('/collectionEdit/:collectionId', iconCltCtrl.collectionEditRender);

router.post('/updateIconCollection', iconCltCtrl.updateCollection);

router.post('/delIconCollection', iconCltCtrl.delCollection);

router.get('/getIconCollection', iconCltCtrl.getCollection);

module.exports = router;