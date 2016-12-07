/**
 * Created by zhengjunling on 2016/12/7.
 */
var formidable = require("formidable");
var db_tools = require("../../mongo/db_tools");
var request = require('request');
var fs = require('fs');

module.exports = {
    imgUpload: function (req, res) {
        var fileServerPath = "http://10.33.31.234:5566"; //图片服务器路径
        var fileDirName = "hui_source"; //图片存储文件夹
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';		//设置编辑
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.write('error\n\n');
                return;
            }
            var formData = {
                dirName: fileDirName,
                upload: fs.createReadStream(files.img.path)
            };
            if (fields.unique == "true") {
                formData.fileName = files.img.name;
            }
            request.post({
                url: fileServerPath + "/containers/upload",
                formData: formData
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
                            name: files.img.name.replace(/\.\w+$/, ''),
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

    }
};