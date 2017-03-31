/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var router = express.Router();
var iconCtrl = require("../../controllers/resources/icon.controller.js");
var iconDownload = require("../../controllers/resources/iconDownload.controller.js");
var uikitCtrl = require("../../controllers/resources/uikit.controller.js");
var animateCtrl = require("../../controllers/animate.controller.js");
var searchCtrl = require("../../controllers/resources/search.controller.js");
var co = require('co');


//--------------------uikit---------------------

router.get('/uikit', uikitCtrl.getUikitPage);


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

/**
 * iconfont&coloricon搜索
 */
router.get('/:icontype/search',searchCtrl);

/**
 * 所以资源详情页
 */
router.get('/iconfont/detail/:iconId', iconCtrl.getIconsById);

//router.get('/getCollections', icon_source.getCollections);
//router.get('/getIconByCollection', icon_source.getIconByCollection);

module.exports = router;