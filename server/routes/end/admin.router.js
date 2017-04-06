/**
 * Created by zhengjunling on 2016/11/25.
 */
var iconTypeEndRouter = require("./iconManager/iconCollection.end.router.js");
var iconEndRouter = require("./iconManager/icon.end.router.js");
//var docEndRouter = require("./docManager/doc.end.router.js");
var articalRouter = require("./artical.router");
var designEndRouter = require("./designManager/design.end.router.js");
var uikitEndRouter = require("./uikitManager/uikit.end.router.js");
var uploadEndRouter = require("./uploadManager/upload.end.router.js");
var aboutRouter = require("./about/about.router");
var animateRouter = require("./animate/animate.router");
var express = require("express");
var router = express.Router();

/**
 * 图标类型管理
 */
router.use('/iconCollection', iconTypeEndRouter);

/**
 * 图标类型管理
 */
//router.use('/iconType', iconTypeEndRouter);

/**
 * 图标管理
 */
router.use('/icon', iconEndRouter);

/**
 * uikit管理
 */
router.use('/uikit', uikitEndRouter);

/**
 * 上传管理
 */
router.use('/upload', uploadEndRouter);

/**
 * 文章管理
 */
//router.use('/doc', docEndRouter);

router.use('/artical', articalRouter);

/**
 * 设计管理
 */
router.use('/design', designEndRouter);

router.use('/animate', animateRouter);

router.use('/about', aboutRouter);

module.exports = router;