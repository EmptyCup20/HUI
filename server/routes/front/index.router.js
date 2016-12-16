/**
 * Created by zhengjunling on 2016/11/25.
 */
var express = require("express");
var router = express.Router();
var indexController = require("../../controllers/resources/index.controller.js");

router.get('/', indexController.frontHome);

module.exports = router;