/**
 * Created by zhengjunling on 2016/11/25.
 */
var db_tools = require("../../mongo/db_tools");
var iconCollections = require("../models/icon.collection.model");
var formidable = require("formidable");
var request = require('request');
var fs = require('fs');
var co = require('co');
var fileModel = ["svg", "png", "psd", "zip"];

module.exports = {
    /**
     * 文件上传
     * @param req
     * @param res
     */
    uploadFile : function(req, res) {
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
                    // fileName: files.iconFile.name, //不传名字自动生成图片
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
    /**
     * 保存资源
     * @param req
     * @param res
     */
    saveResource : function (req, res) {
        var params = req.body;
        var formData = {
            id : params._id,
            name: params.name,
            url: params.url,
            svgfile: params.svgfile,
            pngfile: params.pngfile,
            psdfile: params.psdfile,
            zipfile: params.zipfile,
            fileType: params.fileType,
            otherLink: params.otherLink,
            type: params.collection,
            tags: params.tags
        };
        var method = formData.id ? "edit" : "add";
        db_tools[method]('iconSource', formData).then(function (data) {
            res.send({
                success: true,
                message: "修改成功！",
                data: data
            });
            return;
        }, function (err) {
            console.log(err)
            res.send({
                success: false,
                message: "修改失败！" + err
            });
        });
    },
    /**
     * 删除资源
     * @param req
     * @param res
     */
    delResource : function (req, res) {
        var params = req.body;
        db_tools.remove('iconSource', params.iconId).then(function (data) {
            res.send({
                success: true,
                message: "删除成功！"
            });
            return;
        }, function (err) {
            console.log(err)
            res.send({
                success: false,
                message: "删除失败！" + err
            });
        });
    },
    /**
     * 获取所有iconResources 的数据
     * @param req
     * @param res
     */
    getAllResources : function(req, res){
        co(function*() {
            var data = yield db_tools.queryByCondition('iconSource', {});
            res.render('admin/iconManage.ejs', {
                iconList: data
            });
        });
    },

    /**
     * 获取单个 resources 的数据
     * @param req
     * @param res
     */
    getResourceById : function(rid){
        return new Promise((resolve, reject) => {
            co(function*() {
                var data = yield db_tools.queryByCondition('iconSource', {
                    _id : rid
                });
                resolve(data);
            });
        });
    },
    /**
     * 获取图标集
     * @param req
     * @param res
     * @returns {Promise}
     */
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
    /**
     * 获取图标添加修改页面
     * @param req
     * @param res
     */
    getIconEditPage : function (req, res) {
        var iconId = req.params.iconId;
        co(function*() {
            var fileTypes = yield db_tools.queryByCondition('iconClassify', {});
            var obj = [];
            if(iconId){
                obj = yield db_tools.queryByCondition('iconSource', {
                    _id : iconId
                });
            }
            res.render('admin/iconEdit', {
                fileTypes: fileTypes,
                resource: obj
            });
        })
    },
    /**
     * 根据类型获取图标
     * @param type
     * @returns {Promise}
     */
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