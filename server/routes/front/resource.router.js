/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var router = express.Router();
var iconCtrl = require("../../controllers/resources/icon.controller.js");
var iconDownload = require("../../controllers/resources/iconDownload.controller.js");
var uikitCtrl = require("../../controllers/uikit.controller.js");
var animateCtrl = require("../../controllers/animate.controller.js");
var searchCtrl = require("../../controllers/resources/search.controller.js");
var co = require('co');


//--------------------uikit---------------------

router.get('/uikit', uikitCtrl.renderPage);


//--------------------iconfont---------------------

router.get('/iconfont', iconCtrl.getCollections);

router.get('/iconfont/type/:typeId', iconCtrl.getIconByCollection);
router.get('/iconfont/archiveDownload', iconDownload.archiveDownload);
router.get('/iconfont/iconDownload', iconDownload.iconDownload);

//--------------------彩色图标---------------------

router.get('/coloricon', iconCtrl.getColorIconCollections);

router.get('/coloricon/type/:typeId', iconCtrl.getColorIconByCollection);

//--------------------动效资源---------------------

router.get('/animate', animateCtrl.renderList);

router.get('/animate/detail/:id', animateCtrl.renderDetail);

/**
 * iconfont&coloricon搜索
 */
router.get('/:icontype/search',searchCtrl);

/**
 * 单个图标信息
 */
router.get('/iconfont/detail/:iconId', iconCtrl.getIconInfoById);

//router.get('/getCollections', icon_source.getCollections);
//router.get('/getIconByCollection', icon_source.getIconByCollection);

module.exports = router;