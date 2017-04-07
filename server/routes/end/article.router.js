/**
 * Created by zhengjunling on 2017/4/1.
 */
var express = require("express");
var articleCtrl = require("../../controllers/article.controller.js");
var router = express.Router();

//根据id获取文章信息
router.get('/articleInfo/:id', articleCtrl.getArticleInfo);

//获取文章列表
router.get('/getArticleList', articleCtrl.getArticleList);

//更新文章
router.put('/articleInfo/:id', articleCtrl.modify);

//添加文章
router.post('/articleInfo', articleCtrl.addArticle);

//批量删除文章
router.post('/del', articleCtrl.del);

module.exports = router;