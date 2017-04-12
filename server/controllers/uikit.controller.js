/**
 * Created by zhengjunling on 2017/4/6.
 */
var co = require('co');
var showdown = require('showdown');
var moment = require("moment");
var uikitModel = require("../models/uikit.model.js");
var converter = new showdown.Converter();

module.exports = {
    renderList: function (req, res) {
        var queryParams = {
            pageSize: 20,
            pageNo: Number(req.query.page) || 1
        };
        co(function*() {
            var data = yield uikitModel.getUikitByPage(queryParams);
            var totalPage = Math.ceil(data.total / queryParams.pageSize);
            res.render('resource/uikit', {
                model: "resource",
                subModel: "uikit",
                data: data.rows,
                moment: moment,
                pageNo: queryParams.pageNo,
                totalPage: totalPage,
                loginUser: req.session.cas && req.session.cas.user ? req.session.cas.user : null
            });
        })
    },

    renderDetail: function (req, res) {
        co(function*() {
            var data = yield uikitModel.getUikitInfoById(req.params.id);
            data.content = converter.makeHtml(data.content);
            data.date = moment(data.update_date).format('YYYY-MM-DD');
            res.render('resource/uikitContent', {
                model: "resource",
                subModel: "uikit",
                data: data,
                loginUser: req.session.cas && req.session.cas.user ? req.session.cas.user : null
            });
        })
    },


    /**
     * 根据页码获取uikit列表
     * @param req
     * @param res
     */
    getUikitList: function (req, res) {
        var queryParams = {
            pageSize: req.query.pageSize,
            pageNo: req.query.pageNo,
            searchText: req.query.search || ""
        };
        co(function*() {
            var data = yield uikitModel.getUikitByPage(queryParams);
            res.send(data);
        })
    },

    /**
     * 根据id获取动效信息
     * @param req
     * @param res
     */
    getUikitInfo: function (req, res) {
        co(function*() {
            var data = yield uikitModel.getUikitInfoById(req.params.id);
            res.send(data);
        })
    },

    /**
     * 新增uikit
     * @param req
     * @param res
     */
    save: function (req, res) {
        var params = req.body;
        uikitModel.add(params).then(function (data) {
            res.send(data);
        }, function () {
            res.send(util.resParse(false, "添加失败"));
        })
    },

    /**
     * 编辑uikit信息
     * @param req
     * @param res
     */
    modify: function (req, res) {
        var params = req.body;
        uikitModel.modify(params).then(function (data) {
            res.send(data);
        }, function () {
            res.send(util.resParse(false, "更新失败"));
        })
    },

    /**
     * 删除uikit
     * @param req
     * @param res
     */
    del: function (req, res) {
        co(function*() {
            var data = yield uikitModel.del(req.body.ids);
            res.send(data);
        })
    }
};