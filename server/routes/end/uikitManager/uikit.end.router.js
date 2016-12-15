/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var uikitCtrl = require("../../../controllers/resources/uikit.controller.js");
var express = require("express");
var router = express.Router();

//------------------UIKIT管理------------------------//
router.get('/', uikitCtrl.getEndPage);

router.get('/getCategory', uikitCtrl.getCategory);

router.get('/uikitEdit/:id', uikitCtrl.uikitEdit);

router.post('/addCategory', uikitCtrl.addCategory);

router.post('/editCategory', uikitCtrl.editCategory);

router.post('/delCategory', uikitCtrl.delCategory);

router.post('/getContentById', uikitCtrl.getContent);

router.post('/addContent', uikitCtrl.addContent);

router.post('/removeContent', uikitCtrl.removeContent);

module.exports = router;