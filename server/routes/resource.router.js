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

router.get('/iconfont', function (req, res) {
    co(function*() {
        var data = yield icon_source.getCollections();
        res.render('resource/iconfont.ejs', {
            allIcon: data,
            model: "resource"
        });
    });

});

router.get('/coloricon', function (req, res) {
    res.render('resource/coloricon.ejs', {
        model: "resource"
    });
});

router.get('/iconfont/detail', function (req, res) {
    co(function*() {
        var data = yield icon_source.getIconByCollection(req.query.type);
        res.render('resource/iconfontDetail.ejs', {
            model: "resource",
            iconList: data
        });
    });
});

/**
 * 获取所有的资源
 */
router.get('/all', function (req, res) {
    co(function*() {
        var data = yield icon_source.getAllResources();
        res.render('resource/resourceAll.ejs', {
            model: "resource",
            iconList: data
        });
    });
});

/**
 * 所以资源详情页
 */
router.get('/detail/:id', function (req, res) {
    var rid = req.params.id;
    co(function*() {
        var data = yield icon_source.getResourceById(rid);
        res.render('resource/resourceDetail.ejs', {
            model: "resource",
            results: data
        });
    });
});

//router.get('/getCollections', icon_source.getCollections);
//router.get('/getIconByCollection', icon_source.getIconByCollection);

module.exports = router;