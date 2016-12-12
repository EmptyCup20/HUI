/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var router = express.Router();
var iconCtrl = require("../controllers/icon.controller");
var uikitCtrl = require("../controllers/uikit.controller");
var co = require('co');


//--------------------uikit---------------------

router.get('/uikit', uikitCtrl.render);


//--------------------iconfont---------------------

router.get('/iconfont', iconCtrl.getCollections);

router.get('/iconfont/type/:typeId', iconCtrl.getIconByCollection);

router.get('/coloricon', iconCtrl.getColorIconCollections);

router.get('/coloricon/type/:typeId', iconCtrl.getColorIconByCollection);

/**
 * 所以资源详情页
 */
router.get('/iconfont/detail/:iconId', iconCtrl.getResourceById);

//router.get('/getCollections', icon_source.getCollections);
//router.get('/getIconByCollection', icon_source.getIconByCollection);

module.exports = router;