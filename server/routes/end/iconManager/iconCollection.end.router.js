/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var iconCltCtrl = require("../../../controllers/resources/iconCollection.controller.js");
var express = require("express");
var router = express.Router();

router.get('/getIconCollectionInfo/:id', iconCltCtrl.getCollectionInfo);

router.get('/collectionManage', iconCltCtrl.render);

router.get('/collectionAdd', iconCltCtrl.collectionAddRender);

router.get('/getCollectionInfo', iconCltCtrl.getCollectionInfo);

router.post('/addIconCollection', iconCltCtrl.addCollection);

router.post('/updateIconCollection', iconCltCtrl.updateCollection);

router.post('/delIconCollection', iconCltCtrl.delCollection);

router.post('/uploadAttachment', iconCltCtrl.uploadAttachment);

router.get('/getIconCollection', iconCltCtrl.getCollection);

module.exports = router;