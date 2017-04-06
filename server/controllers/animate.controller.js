/**
 * Created by zhengjunling on 2016/12/12.
 */
var co = require('co');
var formidable = require("formidable");
var request = require('request');
var showdown = require('showdown');
var moment = require("moment");
var util = require("../util");
var animateModel = require("../models/animate.model");
var converter = new showdown.Converter();


module.exports = {
    /**
     * 动效库页面渲染
     * @param req
     * @param res
     */
    renderList: function (req, res) {
        var queryParams = {
            pageSize: 20,
            pageNo: Number(req.query.page) || 1
        };
        co(function*() {
            var data = yield animateModel.getAnimateListByPage(queryParams);
            var totalPage = Math.ceil(data.total / queryParams.pageSize);
            res.render('resource/animate', {
                model: "resource",
                subModel: "animate",
                data: data.rows,
                pageNo: queryParams.pageNo,
                totalPage: totalPage
            });
        })
    },

    /**
     * 动效详情页面渲染
     * @param req
     * @param res
     */
    renderDetail: function (req, res) {
        co(function*() {
            var data = yield animateModel.getAnimateInfoById(req.params.id);
            data.content = converter.makeHtml(data.content);
            data.date = moment(data.update_date).format('YYYY-MM-DD');
            res.render('resource/animateContent', {
                model: "resource",
                subModel: "animate",
                data: data
            });
        })
    },

    /**
     * 根据页码获取动效列表
     * @param req
     * @param res
     */
    getAnimateList: function (req, res) {
        var queryParams = {
            pageSize: req.query.pageSize,
            pageNo: req.query.pageNo,
            searchText: req.query.search || ""
        };
        co(function*() {
            var data = yield animateModel.getAnimateListByPage(queryParams);
            res.send(data);
        })
    },

    /**
     * 删除动效
     * @param req
     * @param res
     */
    delAnimate: function (req, res) {
        co(function*() {
            var data = yield animateModel.del(req.body.ids);
            res.send(data);
        })
    },

    /**
     * 根据id获取动效信息
     * @param req
     * @param res
     */
    getAnimateInfo: function (req, res) {
        co(function*() {
            var data = yield animateModel.getAnimateInfoById(req.params.id);
            res.send(data);
        })
    },

    /**
     * 编辑动效信息
     * @param req
     * @param res
     */
    modify: function (req, res) {
        var params = req.body;
        animateModel.update(params).then(function (data) {
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
    saveAnimate: function (req, res) {
        var params = req.body;
        animateModel.add(params).then(function (data) {
            res.send(data);
        }, function () {
            res.send(util.resParse(false, "添加失败"));
        })
    }
};