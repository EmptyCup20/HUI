/**
 * Created by zhengjunling on 2016/12/7.
 */
var formidable = require("formidable");
var db_tools = require("../../../mongo/db_tools");
var request = require('request');
var fs = require('fs');
var co = require('co');
var EventProxy = require("eventproxy");
var iconModel = require("../../models/resources/icon.model");
var fileModel = require("../../models/resources/file.model");


var settings = require('../../../settings' + (process.env.MODEL ? "-" + process.env.MODEL : "-dev"));
var fileServerPath = settings.fileServerPath; //图片服务器路径
var fileDocument = settings.fileDocument;//图片文件夹
var iconDir = settings.iconPath;//图片文件夹
var UPLOAD_ERR_MSG = "上传失败！请重试";
var UPLOAD_SUCCESS_MSG = "上传成功！";

/**
 * 根据文件名生成标签
 * @param name
 * @returns {string}
 */
function createTags(name) {
    return name.split(/_|-|\./).join(",");
}

function getFileName(name) {
    return name.replace(/\.\w+$/, '');
}

/**
 * 校验上传的文件格式
 * @param files
 * @param type
 * @returns {boolean}
 */
function validFileType(files, type) {
    for (var i = 0; files[i]; i++) {
        if (files[i].type !== type) {
            return false;
        }
    }
    return true;
}

/**
 * 保存svg格式图标
 * @param files
 * @param fields
 * @returns {Promise}
 */
function saveSVGIcons(files, fields) {
    return new Promise(function (resolve, reject) {
        var ep = new EventProxy();

        files.forEach(function (file) {
            fs.readFile(file.path, 'utf-8', function (err, doc) {
                var name = getFileName(file.name);
                ep.emit('got_file', {
                    name: name,
                    type: fields.type,
                    collection_id: fields.collection_id,
                    tags: createTags(name),
                    svgXML: doc
                });
            });
        });

        ep.after('got_file', files.length, function (list) {
            co(function*() {
                var res = yield iconModel.addIcons(list);
                if (res.success) {
                    res.message = "图标上传成功";
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
    });
}

/**
 * 保存png格式图标
 * @param files
 * @param fields
 * @returns {Promise}
 */
var savePNGIcons = function (files, fields) {
    return new Promise(function (resolve, reject) {
        var ep = new EventProxy();

        files.forEach(function (file) {
            fileModel.upload(file.path, iconDir).then(function (data) {
                var name = getFileName(file.name);
                ep.emit('uploadIcon', {
                    url: fileServerPath + data.url,
                    name: name,
                    type: fields.type,
                    collection_id: fields.collection_id,
                    tags: createTags(name)
                });
            }, function (err) {
                reject({
                    success: false,
                    message: "上传失败！"
                });
            });
        });

        ep.after('uploadIcon', files.length, function (list) {
            co(function*() {
                var res = yield iconModel.addIcons(list);
                if (res.success) {
                    res.message = "图标上传成功";
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
    });
};

module.exports = {
    /**
     * 图标上传
     * @param req
     * @param res
     */
    iconUpload: function (req, res) {
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';		//设置编辑
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
        form.multiples = true;
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.write('error:' + err);
                return;
            }
            var fileData = files[fields.name];
            var MIMEType = fields.type === "0" ? "image/svg+xml" : "image/png";
            fileData = Array.isArray(fileData) ? fileData : [fileData];
            if (validFileType(fileData, MIMEType)) {
                if (fields.type === "0") {
                    saveSVGIcons(fileData, fields).then(function (data) {
                        res.send(data);
                    }, function (err) {
                        res.send(err);
                    });
                } else {
                    savePNGIcons(fileData, fields).then(function (data) {
                        res.send(data);
                    }, function (err) {
                        res.send(err);
                    });
                }
            } else {
                res.send({
                    success: false,
                    message: "上传文件中存在不符合类型的文件"
                });
            }
        });
    },
    /**
     * 图片上传
     * @param req
     * @param res
     */
    fileUpload: function (req, res) {
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';		//设置编辑
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
        form.multiples = true;
        form.parse(req, function (err, fields, files) {
            if (err) {
                return res.send({
                    success: false,
                    message: UPLOAD_ERR_MSG
                });
            }
            var file = files[fields.name];
            var fileType = file.name.replace(/^.+\./, '');
            if (fields.type && fields.type.indexOf(fileType.toLowerCase()) == -1) {
                res.send({
                    success: false,
                    message: "上传文件格式不正确！"
                });
                return
            }
            fileModel.upload(file.path).then(function (data) {
                if (data.type == "success") {
                    res.send({
                        success: true,
                        message: UPLOAD_SUCCESS_MSG,
                        data: {
                            name: file.name,
                            url: fileServerPath + data.url,
                            downloadUrl: fileServerPath + '/containers/download' + data.url
                        }
                    });
                } else {
                    res.send({
                        success: false,
                        message: UPLOAD_ERR_MSG
                    });
                }
            }, function (err) {
                res.send({
                    success: false,
                    message: UPLOAD_ERR_MSG
                });
            });
        });
    }
};