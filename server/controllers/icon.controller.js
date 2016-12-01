/**
 * Created by zhengjunling on 2016/11/25.
 */
var formidable = require("formidable");
var path = require("path");
var db_tools = require("../../mongo/db_tools");
var iconCollections = require("../models/icon.collection.model");
var co = require('co');
var request = require('request');
var fs = require('fs');

module.exports = {
    //svg图标上传
    upload: function (req, res) {
        var fileServerPath = "http://10.33.31.234:5566"; //图片服务器路径
        var fileDirName = "hui_svg"; //图片存储文件夹
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';		//设置编辑
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.write('error\n\n');
                return;
            }
            request.post({
                url: fileServerPath + "/containers/upload",
                formData: {
                    dirName: fileDirName,
                    fileName: files.iconFile.name,
                    upload: fs.createReadStream(files.iconFile.path)
                }
            }, function (err, httpResponse, body) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    });
                    return;
                }
                body = JSON.parse(body);
                if (body.type == "success") {
                    res.send({
                        success: true,
                        message: "上传成功！",
                        data: {
                            name: files.iconFile.name.replace(/\.\w+$/, ''),
                            url: fileServerPath + body.url
                        }
                    });
                } else {
                    var message;
                    switch (body.message.code) {
                        case "EEXIST":
                            message = "文件已存在！";
                            break;
                        default:
                            message = "上传失败！";
                    }
                    res.send({
                        success: false,
                        message: message
                    });
                }
            });
        });
    },
    //图标信息保存到数据库
    add: function (req, res) {
        var params = req.body;
        var formData = {
            name: params.name,
            url: params.url,
            type: params.collection,
            tags: params.tag
        };

        //if (!formData.name || !formData.url || !formData.type) {
        //    res.send({
        //        success: false,
        //        message: "数据有误，无法上传！"
        //    });
        //}
        db_tools.add('iconSource', formData).then(function (data) {
            res.send({
                success: true,
                message: "上传成功！",
                data: data
            });
            return;
        }, function (err) {
            res.send({
                success: false,
                message: "上传失败！"
            });
        });
    },

    //获取图标集
    getCollections: function (req, res) {
        var allIcon = [];
        return new Promise((resolve, reject) => {
            co(function*() {
                for (var i = 0, item; item = iconCollections[i]; i++) {
                    var data = yield db_tools.queryByCondition('iconSource', {
                        type: item.id
                    });
                    allIcon.push({
                        collection: item.name,
                        typeId: item.id,
                        icon: data
                    })
                }
                resolve(allIcon);
            });
        });
    },

    //根据类型获取图标
    getIconByCollection: function (type) {
        return new Promise((resolve, reject) => {
            co(function*() {
                var data = yield db_tools.queryByCondition('iconSource', {
                    type: type
                });
                resolve(data);
            })
        });
    }
}