/**
 * Created by zhengjunling on 2016/11/25.
 */
var icon_source = require("../controllers/icon.controller");
var docController = require("../controllers/doc.controller");
var express = require("express");
var router = express.Router();

router.get('/', function (req, res) {
    res.render('admin/index');
})

router.get('/upload', function (req, res) {
    res.render('admin/icon_upload', {
        model: 'icon_upload'
    });
});

router.get('/getPage/:pagePath', function (req, res) {
    res.render('admin/' + req.params.pagePath);
});

router.get('/getDesignDocMd', docController.getDesignDocMd);

router.post('/updateDesignDoc', docController.updateDesignDoc);

//上传图标
router.post("/iconUpload", icon_source.upload);

router.post("/icon/add", icon_source.add);

module.exports = router;