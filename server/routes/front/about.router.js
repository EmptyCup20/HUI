/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var aboutCtrl = require("../../controllers/about.controller");
var router = express.Router();

router.get('/', aboutCtrl.renderPage);

module.exports = router;