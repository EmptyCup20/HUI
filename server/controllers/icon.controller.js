/**
 * Created by zhengjunling on 2016/11/25.
 */
var formidable = require("formidable");
var path = require("path");
var db_tools = require("../../mongo/db_tools");
var iconCollections = require("../models/icon.collection.model");
var co = require('co')
var request = require('request')
var fs = require('fs')

module.exports = {
    //svg图标上传
    upload: function (req, res) {
        var uploadDir = path.join('files', 'icon', 'svg');
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';		//设置编辑
        form.uploadDir = global.rootPath + uploadDir;	 //设置上传目录
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.write('error\n\n');
                return;
            }
            var reg = /\.\w+$/;
            var paths = files.iconFile.path.split('\\');
            var response = {
                name: files.iconFile.name.replace(reg, ''),
                url: '\\' + uploadDir +'\\' + paths[paths.length - 1]
            }

            var formData = {
                upload: fs.createReadStream(files.iconFile.path)
            };

            request.post({
                url: "http://10.20.134.55:5566/containers/upload/xxx/" + files.iconFile.name,
                formData: formData
            },  function(err, httpResponse, body) {
                if (err) {
                    console.log('err:' +  err);
                }
                console.log('body:' + body);
            });
            // res.send(response);
            //var formData = {
            //    name: fields.iconName,
            //    type: files.iconFile.type
            //};
            //db_tools.add('iconSource', formData).then(function (data) {
            //    res.send(data);
            //    return;
            //}, function (err) {
            //    console.log(err);
            //});
            //之前在dir下面会生成对应文件, 这行代码是用来删除文件的
            //fs.unlinkSync(files.upload.path);
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

        if (!formData.name || !formData.url || !formData.type) {
            res.send({
                success: false,
                message: "数据有误，无法上传！"
            });
        }
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
            console.log(err);
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