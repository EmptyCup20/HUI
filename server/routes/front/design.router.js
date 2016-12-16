/**
 * Created by zhengjunling on 2016/12/5.
 */
var express = require("express");
var router = express.Router();
var docController = require("../../controllers/resources/doc.controller.js");

router.get('/getDesign/:type', docController.getDesign);

module.exports = router;