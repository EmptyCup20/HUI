/**
 * Created by zhengjunling on 2016/11/25.
 */
var db_tools = require("../../mongo/db_tools");
var iconCollections = require("../models/icon.collection.model");
var co = require('co');
var fileModel = ["svg", "png", "psd", "zip"];

module.exports = {
    /**
     * 所有类型查看
     * 0 svg
     * 1 png
     * 2 psd
     * 3 zip
     */
    getTypeList : function (req, res) {
        var self = this;
        co(function*() {
            var data = yield db_tools.queryByCondition('iconClassify', {});
            res.render('admin/fileType_list.ejs', {
                model: 'icon_upload',
                typeList : data,
                fileModel : fileModel
            });
        });
    },
    /**
     * 打开添加页面
     */
    getTypeAddPage : function(req, res){
        res.render('admin/fileType_edit.ejs', {
            model: 'icon_upload',
            data : [],
            fileModel : fileModel
        });
    },
    /**
     * 打开类型修改页面
     * @param req
     * @param res
     */
    getTypeEditPage : function (req, res) {
        var typeId = req.params.typeId;
        co(function*() {
            var data = yield db_tools.queryByCondition('iconClassify', {
                _id: typeId
            });
            res.render('admin/fileType_edit.ejs', {
                model: 'icon_upload',
                data : data,
                fileModel : fileModel
            });
        });
    },
    /**
     * 保存类型
     * @param req
     * @param res
     */
    saveType : function (req, res) {
        var params = req.body;
        var formData = {
            id : params._id,
            name: params.name,
            fileType: params.fileType
        };
        var method = params._id ? "edit" : "add";
        db_tools[method]('iconClassify', formData).then(function (data) {
            res.send({
                success: true,
                message: "保存成功！",
                data: data
            });
            return;
        }, function (err) {
            console.log(err)
            res.send({
                success: false,
                message: "保存失败！" + err
            });
        });
    },

    /**
     * 根据tid去查找资源对象
     * @param tId
     * @returns {Promise}
     */
    getFileTypeById : function(tId){
        return new Promise((resolve, reject) => {
            co(function*() {
                var data = yield db_tools.queryByCondition('iconClassify', {
                    _id: tId
                });
                resolve(data);
            });
        });
    }
}