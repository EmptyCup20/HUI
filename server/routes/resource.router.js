/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var router = express.Router();
var icon_source = require("../controllers/icon.controller");


router.get('/', function (req, res) {
    res.render('resource/resource.ejs', {
        title: '资源库'
    });
});

router.get('/getCollections', icon_source.getCollections);
router.get('/getIconByCollection', icon_source.getIconByCollection);

module.exports = router;