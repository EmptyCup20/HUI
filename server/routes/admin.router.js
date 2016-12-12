/**
 * Created by zhengjunling on 2016/11/25.
 */
var iconCltCtrl = require("../controllers/iconCollection.controller");
var iconController = require("../controllers/icon.controller");
var docController = require("../controllers/doc.controller");
var iconTypeController = require("../controllers/iconType.controller");
var uploadCtrl = require("../controllers/upload.controller");
var uikitCtrl = require("../controllers/uikit.controller");
var express = require("express");
var co = require("co");
var router = express.Router();

/**
 * 后台入口
 */
router.get('/', function (req, res) {
    res.render('admin/index');
})

//--------------------------图标资源管理------------------//
/**
 * 图标库管理
 */
router.get('/collectionManage', iconCltCtrl.render);

router.get('/collectionAdd', iconCltCtrl.collectionAddRender);

router.get('/collectionEdit/:collectionId', iconCltCtrl.collectionEditRender);

router.post('/addIconCollection', iconCltCtrl.addCollection);

router.post('/delIconCollection', iconCltCtrl.delCollection);


router.get('/getIconCollection', iconCltCtrl.getCollection);


router.get('/updateIconCollection', iconCltCtrl.updateIconCollection);


//--------------------------图片资源管理------------------//
/**
 * 图片管理页, 所有图片
 */
router.get('/resource/all', iconController.getAllResources);

/**
 * 图片添加修改页面
 */
router.get('/getIconEditPage', iconController.getIconEditPage);

router.get('/getIconEditPage/:iconId', iconController.getIconEditPage);

router.post("/fileUpload", iconController.uploadFile);

router.post("/icon/add", iconController.add);

router.post("/icon/del", iconController.delResource);


//--------------------------图片类型管理------------------//
router.get('/typeList', iconTypeController.getTypeList);

router.get('/typeAdd', iconTypeController.getTypeAddPage);

router.get('/typeEdit/:typeId', iconTypeController.getTypeEditPage);

router.post('/typeEdit', iconTypeController.saveType);

router.post('/typeDel', iconTypeController.delType);

//------------------文章管理------------------------//
router.get('/getDesignDocMd', docController.getDesignDocMd);

router.post('/updateDesignDoc', docController.updateDesignDoc);

//------------------UIKIT管理------------------------//
router.get('/uikit/getCategory', uikitCtrl.getCategory);

router.get('/uikit/uikitEdit/:id', uikitCtrl.uikitEdit);

router.post('/uikit/addCategory', uikitCtrl.addCategory);

router.post('/uikit/delCategory', uikitCtrl.delCategory);

router.post('/uikit/getContentById', uikitCtrl.getContent);

router.post('/uikit/addContent', uikitCtrl.addContent);


//------------------请求页面------------------------//
router.get('/getPage/:pagePath', function (req, res) {
    res.render('admin/' + req.params.pagePath);
});

//------------------资源上传（图片、图标、附件）------------------------//
router.post('/imgUpload', uploadCtrl.imgUpload);

router.post('/iconUpload', uploadCtrl.iconUpload);

router.post('/attachmentUpload', uploadCtrl.attachmentUpload);

module.exports = router;