/**
 * Created by zhengjunling on 2017/4/1.
 */
var express = require("express");
var articalCtrl = require("../../controllers/artical.controller");
var router = express.Router();

router.get('/', articalCtrl.renderList);

router.get('/detail/:id', articalCtrl.renderDetail);

router.post('/api/comment/:id', articalCtrl.addComment);

module.exports = router;