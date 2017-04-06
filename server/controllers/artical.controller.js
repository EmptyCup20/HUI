/**
 * Created by zhengjunling on 2016/12/12.
 */
var co = require('co');
var formidable = require("formidable");
var showdown = require('showdown');
var moment = require("moment");
var util = require("../util");
var articalModel = require("../models/artical.model");

var converter = new showdown.Converter();

module.exports = {
    renderList: function (req, res) {
        var queryParams = {
            pageSize: 20,
            pageNo: Number(req.query.page) || 1
        };
        articalModel.getArticalListByPage(queryParams).then(function (data) {
            var totalPage = Math.ceil(data.total / queryParams.pageSize);
            res.render('artical/artical', {
                model: "artical",
                data: data.rows,
                formate: util.formatShowDate,
                pageNo: queryParams.pageNo,
                totalPage: totalPage
            });
        }, function () {
            res.render('artical/artical', {
                model: "artical",
                data: [],
                formate: util.formatShowDate,
                pageNo: 1,
                totalPage: 1
            });
        });
    },

    renderDetail: function (req, res) {
        co(function*() {
            var data = yield articalModel.getArticalInfoById(req.params.id);
            data.content = converter.makeHtml(data.content);
            data.date = util.formatShowDate(data.create_at);
            res.render('artical/articalDetail', {
                model: "artical",
                data: data,
                formate: util.formatShowDate,
            });
        })
    },

    /**
     * 添加评论
     * @param req
     * @param res
     */
    addComment: function (req, res) {
        co(function*() {
            var formData = {
                replyTo: req.body.replyTo || null,
                content: req.body.message,
                author: req.body.author || null
            };
            var articalId = req.params.id;
            articalModel.insertComment({_id: articalId}, {reply: formData}).then(function (data) {
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
    getArticalList: function (req, res) {
        var queryParams = {
            pageSize: req.query.pageSize,
            pageNo: req.query.pageNo,
            searchText: req.query.search || ""
        };
        articalModel.getArticalListByPage(queryParams).then(function (data) {
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
    getArticalInfo: function (req, res) {
        co(function*() {
            var data = yield articalModel.getArticalInfoById(req.params.id);
            res.send(data);
        })
    },

    /**
     * 删除文章
     * @param req
     * @param res
     */
    del: function (req, res) {
        articalModel.del(req.body.ids).then(function () {
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
        articalModel.modify(params).then(function (data) {
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
    addArtical: function (req, res) {
        var params = req.body;
        articalModel.add(params).then(function (data) {
            res.send(data);
        }, function () {
            res.send(util.resParse(false, "添加失败"));
        })
    }
};