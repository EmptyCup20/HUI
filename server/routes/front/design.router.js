/**
 * Created by zhengjunling on 2016/12/5.
 */
var express = require("express");
var router = express.Router();
var designController = require("../../controllers/resources/design.controller.js");

router.get('/getDesign/:type', designController.getDesign);

module.exports = router;