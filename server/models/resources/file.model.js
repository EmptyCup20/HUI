/**
 * Created by zhengjunling on 2017/3/27.
 */
var co = require('co');
var request = require('request');
var fs = require('fs');

var settings = require('../../../settings' + (process.env.MODEL ? "-" + process.env.MODEL : "-dev"));
var fileServerPath = settings.fileServerPath; //图片服务器路径
var fileDocument = settings.fileDocument;//图片文件夹

module.exports = {
    upload: function (filePath, dir) {
        return new Promise((resolve, reject) => {
            request.post({
                url: fileServerPath + "/containers/upload",
                formData: {
                    dirName: dir || fileDocument,
                    upload: fs.createReadStream(filePath)
                }
            }, function (err, httpResponse, body) {
                err ? reject(err) : resolve(JSON.parse(body));
            });
        })
    },

    del: function (fileNameArr) {
        fileNameArr = Array.isArray(fileNameArr) ? fileNameArr : [fileNameArr];
        return new Promise((resolve, reject) => {
            request.post({
                url: fileServerPath + "/containers/delete",
                form: {
                    dirName: fileDocument,
                    files: JSON.stringify(fileNameArr)
                }
            }, function (err, httpResponse, body) {
                err ? reject(err) : resolve(body);
            });
        })
    }
};