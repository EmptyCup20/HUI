/**
 * Created by zhengjunling on 2017/4/1.
 */
var express = require("express");
var articleCtrl = require("../../controllers/article.controller.js");
var router = express.Router();

router.get('/', articleCtrl.renderList);

router.get('/detail/:id', articleCtrl.renderDetail);

router.post('/api/comment/:id', articleCtrl.addComment);

module.exports = router;