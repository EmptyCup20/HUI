/**
 * Created by zhengjunling on 2016/12/9.
 */
var formidable = require("formidable");
var request = require('request');
var fs = require('fs');
var co = require('co');
var fileModel = require("../../models/resources/file.model");
var iconCollectionModel = require("../../models/resources/iconCollection.model");

var settings = require('../../../settings' + (process.env.MODEL ? "-" + process.env.MODEL : "-dev"));
var fileServerPath = settings.fileServerPath; //图片服务器路径

module.exports = {
    /**
     * 获取图标库基本信息
     * @param req
     * @param res
     */
    getCollectionInfo: function (req, res) {
        var collectionId = req.params.id;
        co(function*() {
            var collection = yield iconCollectionModel.getCollectionById(collectionId);
            res.send(collection);
        })
    },

    /**
     * 获取图标库列表
     * @param req
     * @param res
     */
    getCollection: function (req, res) {
        var queryParams = {
            pageSize: req.query.pageSize,
            pageNo: req.query.pageNo,
            searchText: req.query.search || ""
        }
        co(function*() {
            var data = yield iconCollectionModel.getCollectionByPage(queryParams);
            res.send(data);
        })
    },

    /**
     * 添加图标库
     * @param req
     * @param res
     */
    addCollection: function (req, res) {
        co(function*() {
            var data = yield iconCollectionModel.addCollection(req.body);
            res.send(data);
        });
    },

    /**
     * 更新图标库信息
     * @param req
     * @param res
     */
    updateCollection: function (req, res) {
        co(function*() {
            var data = yield iconCollectionModel.updateCollection(req.body);
            res.send(data);
        })
    },

    /**
     * 删除图标库
     * @param req
     * @param res
     */
    delCollection: function (req, res) {
        co(function*() {
            var data = yield iconCollectionModel.delCollection(req.body.ids);
            res.send(data);
        })
    },

    /**
     * 上传psd附件
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
            var fileType = file.name.replace(/^.+\./, '');
            if (fields.type.indexOf(fileType.toLowerCase()) == -1) {
                res.send({
                    success: false,
                    message: "上传文件格式不正确！"
                });
                return
            }

            fileModel.upload(file.path).then(function (data) {
                if (data.type !== "success") {
                    return res.send({
                        success: false,
                        message: "上传失败！请重试"
                    });
                }
                co(function*() {
                    var updateRes = yield iconCollectionModel.updateCollection({
                        _id: fields.collection_id,
                        attachment_url: fileServerPath + '/containers/download' + data.url,
                        attachment_name: file.name
                    });
                    if (!updateRes.success) {
                        return res.send({
                            success: false,
                            message: "上传失败！请重试"
                        });
                    }
                    res.send(updateRes);
                });
            }, function (err) {
                console.log("Upload error:" + err);
                res.send({
                    success: false,
                    message: "上传失败！请重试"
                });
            });
        });
    }
};