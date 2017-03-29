/**
 * Created by zhengjunling on 2017/3/29.
 */
var express = require("express");
var aboutCtrl = require("../../../controllers/about.controller");
var router = express.Router();

router.get('/get', aboutCtrl.getContent);

router.post('/update', aboutCtrl.update);

module.exports = router;