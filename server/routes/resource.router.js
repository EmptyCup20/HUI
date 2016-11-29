/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var router = express.Router();
var icon_source = require("../controllers/icon.controller");
var co = require('co');

router.get('/uikit', function (req, res) {
    res.render('resource/uikit.ejs', {
        title: '资源库'
    });
});

router.get('/iconfont', function (req, res) {
    co(function*() {
        var data = yield icon_source.getCollections();
        res.render('resource/iconfont.ejs', {
            allIcon:data
        });
    });

});

router.get('/coloricon', function (req, res) {
    res.render('resource/coloricon.ejs', {
        title: '资源库'
    });
});

router.get('/iconfont/detail', function (req, res) {
    res.render('resource/iconfontDetail.ejs', {
        title: '资源库'
    });
});

//router.get('/getCollections', icon_source.getCollections);
//router.get('/getIconByCollection', icon_source.getIconByCollection);

module.exports = router;