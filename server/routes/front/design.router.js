/**
 * Created by zhengjunling on 2016/12/5.
 */
var express = require("express");
var router = express.Router();
var designController = require("../../controllers/design.controller.js");

router.get('/:type', designController.renderPage);

module.exports = router;