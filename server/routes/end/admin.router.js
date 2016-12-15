/**
 * Created by zhengjunling on 2016/11/25.
 */
var iconTypeEndRouter = require("./iconManager/iconType.end.router.js");
var iconEndRouter = require("./iconManager/icon.end.router.js");
var docEndRouter = require("./docManager/doc.end.router.js");
var uikitEndRouter = require("./uikitManager/uikit.end.router.js");
var uploadEndRouter = require("./uploadManager/upload.end.router.js");
var express = require("express");
var router = express.Router();

/**
 * 后台入口
 */
router.get('/', function (req, res) {
    res.render('admin/index');
})

/**
 * 图标类型管理
 */
router.use('/iconType', iconTypeEndRouter);

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
router.use('/doc', docEndRouter);

module.exports = router;