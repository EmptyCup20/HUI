/**
 * Created by zhengjunling on 2016/11/25.
 */
var formidable = require("formidable");
var db_tools = require("../../mongo/db_tools");

module.exports = {
    upload: function (req, res) {
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';		//设置编辑
        form.uploadDir = global.rootPath + "files/icon/svg";	 //设置上传目录
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.write('error\n\n');
                return;
            }
            var formData = {
                name: fields.iconName,
                type: files.iconFile.type
            };
            db_tools.add('iconSource', formData).then(function (data) {
                res.send(data);
                return;
            }, function (err) {
                console.log(err);
            });
            //之前在dir下面会生成对应文件, 这行代码是用来删除文件的
            //fs.unlinkSync(files.upload.path);
        });
    }
}