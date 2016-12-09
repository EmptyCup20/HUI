/**
 * Created by zhengjunling on 2016/11/25.
 */
var iconController = require("../controllers/icon.controller");
var docController = require("../controllers/doc.controller");
var iconTypeController = require("../controllers/iconType.controller");
var workController = require("../controllers/work.controller");
var uploadController = require("../controllers/upload.controller");
var express = require("express");
var co = require("co");
var router = express.Router();

/**
 * 后台入口
 */
router.get('/', function (req, res) {
    res.render('admin/index');
})

//--------------------------图片资源管理------------------//
/**
 * 图片管理页, 所有图片
 */
router.get('/resource/all', iconController.getAllResources);
router.post('/imgUpload', uploadController.imgUpload);

/**
 * 图片添加修改页面
 */
router.get('/getIconEditPage', iconController.getIconEditPage);

router.get('/getIconEditPage/:iconId', iconController.getIconEditPage);

router.post("/fileUpload", iconController.uploadFile);

router.post("/icon/add", iconController.saveResource);

router.post("/icon/del", iconController.delResource);


//--------------------------图片类型管理------------------//
router.get('/typeList', iconTypeController.getTypeList);

router.get('/typeAdd', iconTypeController.getTypeAddPage);

router.get('/typeEdit/:typeId', iconTypeController.getTypeEditPage);

router.post('/typeEdit', iconTypeController.saveType);

router.post('/typeDel', iconTypeController.delType);

//------------------文章管理------------------------//
router.get('/getPage/:pagePath', function (req, res) {
    res.render('admin/' + req.params.pagePath);
});

router.get('/getDesignDocMd', docController.getDesignDocMd);

router.post('/updateDesignDoc', docController.updateDesignDoc);


//------------------作品池管理------------------------//
router.get('/getWork/:workPath', function (req, res) {
    res.render('admin/' + req.params.workPath);
});

router.get('/getWorkMd', workController.getWorkMd);

router.post('/updateWork', workController.updateWork);

router.post('/addWork', workController.addWork);

router.get('/getWorkList', workController.getWorkList);

module.exports = router;