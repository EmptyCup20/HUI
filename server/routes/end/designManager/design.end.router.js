/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var designController = require("../../../controllers/resources/design.controller.js");
var express = require("express");
var router = express.Router();

router.get('/getDocById', designController.getDocById);

router.post('/updateDoc', designController.updateDoc);

router.get('/getDocList', designController.getDocList);


module.exports = router;