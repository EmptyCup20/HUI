/**
 * Created by zhengjunling on 2016/12/12.
 */
var co = require('co');
var formidable = require("formidable");
var showdown = require('showdown');
var moment = require("moment");
var util = require("../util");
var articleModel = require("../models/article.model.js");

var converter = new showdown.Converter();

module.exports = {
    renderList: function (req, res) {
        var queryParams = {
            pageSize: 20,
            pageNo: Number(req.query.page) || 1
        };
        articleModel.getArticleListByPage(queryParams).then(function (data) {
            var totalPage = Math.ceil(data.total / queryParams.pageSize);
            res.render('article/article', {
                model: "article",
                data: data.rows,
                formate: util.formatShowDate,
                pageNo: queryParams.pageNo,
                totalPage: totalPage,
                loginUser: req.session.cas && req.session.cas.user ? req.session.cas.user : null
            });
        }, function () {
            res.render('article/article', {
                model: "article",
                data: [],
                formate: util.formatShowDate,
                pageNo: 1,
                totalPage: 1,
                loginUser: req.session.cas && req.session.cas.user ? req.session.cas.user : null
            });
        });
    },

    renderDetail: function (req, res) {
        co(function*() {
            var data = yield articleModel.getArticleInfoById(req.params.id);
            data.content = converter.makeHtml(data.content);
            data.date = util.formatShowDate(data.create_at);
            res.render('article/articleDetail', {
                model: "article",
                data: data,
                formate: util.formatShowDate,
                loginUser: req.session.cas && req.session.cas.user ? req.session.cas.user : null
            });
        })
    },

    /**
     * 添加评论
     * @param req
     * @param res
     */
    addComment: function (req, res) {
        if(!req.session.cas || !req.session.cas.user){
            res.send(util.resParse(false, "未登录，请登录后评论"));
            return;
        }
        co(function*() {
            var formData = {
                replyTo: req.body.replyTo || null,
                content: req.body.message,
                author: req.session.cas.user || null
            };
            var articleId = req.params.id;
            articleModel.insertComment({_id: articleId}, {reply: formData}).then(function (data) {
                res.send(util.resParse(true, "", data));
            }, function () {
                res.send(util.resParse(false, "评论失败！请重试"));
            });
        })
    },

    /**
     * 获取文章列表
     * @param req
     * @param res
     */
    getArticleList: function (req, res) {
        var queryParams = {
            pageSize: req.query.pageSize,
            pageNo: req.query.pageNo,
            searchText: req.query.search || ""
        };
        articleModel.getArticleListByPage(queryParams).then(function (data) {
            res.send(data);
        }, function () {
            res.send(util.resParse(false, "获取文章列表失败！"));
        });
    },

    /**
     * 通过id获取文章信息
     * @param req
     * @param res
     */
    getArticleInfo: function (req, res) {
        co(function*() {
            var data = yield articleModel.getArticleInfoById(req.params.id);
            res.send(data);
        })
    },

    /**
     * 删除文章
     * @param req
     * @param res
     */
    del: function (req, res) {
        articleModel.del(req.body.ids).then(function () {
            res.send(util.resParse(true, "删除成功！"));
        }, function () {
            res.send(util.resParse(false, "删除失败！"));
        });
    },

    /**
     * 编辑动效信息
     * @param req
     * @param res
     */
    modify: function (req, res) {
        var params = req.body;
        articleModel.modify(params).then(function (data) {
            res.send(data);
        }, function () {
            res.send(util.resParse(false, "更新失败"));
        })
    },

    /**
     * 新增动效信息
     * @param req
     * @param res
     */
    addArticle: function (req, res) {
        var params = req.body;
        articleModel.add(params).then(function (data) {
            res.send(data);
        }, function () {
            res.send(util.resParse(false, "添加失败"));
        })
    }
};