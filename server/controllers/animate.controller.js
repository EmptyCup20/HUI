/**
 * Created by zhengjunling on 2016/12/12.
 */
var co = require('co');
var formidable = require("formidable");
var request = require('request');
var fs = require('fs');
var showdown = require('showdown');
var moment = require("moment");
var util = require("../util");
var fileModel = require("../models/resources/file.model");
var animateModel = require("../models/animate.model");
var settings = require('../../settings' + (process.env.MODEL ? "-" + process.env.MODEL : "-dev"));
var fileServerPath = settings.fileServerPath; //图片服务器路径
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
            pageNo: parseInt(req.query.page, 10) || 1
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
            pageNo: req.query.pageNo
        }
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
    },

    /**
     * 上传动效封面
     * @param req
     * @param res
     */
    uploadCoverPic: function (req, res) {
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';		//设置编辑
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
        form.multiples = true;
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.send({
                    success: false,
                    message: 'error:' + err
                });
                return;
            }
            var file = files[fields.name];
            var fileType = file.name.replace(/^.+\./, '');
            if (fields.type.indexOf(fileType.toLowerCase()) == -1) {
                return res.send(util.resParse(false, "上传文件格式不正确！"));
            }
            fileModel.upload(file.path).then(function (data) {
                if (data.type !== "success") {
                    return res.send(util.resParse(false, "上传失败！请重试"));
                }
                res.send(util.resParse(true, "上传成功！", {
                    cover_img_url: fileServerPath + data.url
                }));
            }, function (err) {
                console.log("Upload error:" + err);
                res.send(util.resParse(false, "上传失败！请重试"));
            });
        });
    },

    /**
     * 上传动效附件
     * @param req
     * @param res
     */
    uploadAttachment: function (req, res) {
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';		//设置编辑
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
        form.multiples = true;
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.send({
                    success: false,
                    message: 'error:' + err
                });
                return;
            }
            var file = files[fields.name];
            fileModel.upload(file.path).then(function (data) {
                if (data.type !== "success") {
                    return res.send(util.resParse(false, "上传失败！请重试"));
                }
                res.send(util.resParse(true, "上传成功！", {
                    attachment_url: fileServerPath + '/containers/download' + data.url,
                    attachment_name: file.name
                }));
            }, function (err) {
                console.log("Upload error:" + err);
                res.send(util.resParse(false, "上传失败！请重试"));
            });
        });
    }
};