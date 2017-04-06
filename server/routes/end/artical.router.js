/**
 * Created by zhengjunling on 2017/4/1.
 */
var express = require("express");
var articalCtrl = require("../../controllers/artical.controller");
var router = express.Router();

//根据id获取文章信息
router.get('/articalInfo/:id', articalCtrl.getArticalInfo);

//获取文章列表
router.get('/getArticalList', articalCtrl.getArticalList);

//更新文章
router.put('/articalInfo/:id', articalCtrl.modify);

//添加文章
router.post('/articalInfo', articalCtrl.addArtical);

//批量删除文章
router.post('/del', articalCtrl.del);

module.exports = router;