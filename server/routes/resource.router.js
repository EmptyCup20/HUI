/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var router = express.Router();
var icon_source = require("../controllers/icon.controller");
var co = require('co');

router.get('/uikit', function (req, res) {
    res.render('resource/uikit.ejs', {
        model: "resource"
    });
});

router.get('/iconfont', icon_source.getCollections);

router.get('/coloricon', function (req, res) {
    res.render('resource/coloricon.ejs', {
        model: "resource"
    });
});

router.get('/iconfont/type/:typeId', icon_source.getIconByCollection);

/**
 * 所以资源详情页
 */
router.get('/iconfont/detail/:iconId', icon_source.getResourceById);

//router.get('/getCollections', icon_source.getCollections);
//router.get('/getIconByCollection', icon_source.getIconByCollection);

module.exports = router;