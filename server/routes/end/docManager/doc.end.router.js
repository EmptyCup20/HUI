/**
 * Created by xiangxiao3 on 2016/12/13.
 */
var docController = require("../../../controllers/resources/doc.controller.js");
var express = require("express");
var router = express.Router();


//------------------作品池管理------------------------//
router.get('/getWork/:workPath', function (req, res) {
    res.render('admin/' + req.params.workPath);
});

// router.get('/docManageEdit', docController.getEndDocManageEdit);

// router.get('/docManage', docController.getEndDocManage);

router.get('/getDocById', docController.getDocById);

router.post('/updateDoc', docController.updateDoc);

router.post('/addDoc', docController.addDoc);

router.post('/delDoc', docController.delDoc);

router.get('/getDocList', docController.getDocList);

router.get('/articalInfo/:id', animateCtrl.getArticalInfoById);

//------------------文章管理------------------------//
//router.get('/docManage', docController.getEndDoc);
//
//router.get('/getDesignDocMd', docController.getDesignDocMd);
//
//router.post('/updateDesignDoc', docController.updateDesignDoc);

module.exports = router;