/**
 * Created by zhengjunling on 2016/12/5.
 */
var express = require("express");
var router = express.Router();
var docController = require("../../controllers/resources/doc.controller.js");
var co = require('co');
var markdown = require("markdown").markdown;


router.get('/getWebDesign', docController.getWebDesign);

module.exports = router;