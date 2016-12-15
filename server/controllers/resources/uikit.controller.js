/**
 * Created by zhengjunling on 2016/12/8.
 */
var db_tools = require("../../../mongo/db_tools");
var co = require('co');

module.exports = {
    getEndPage : function(req,res){
        res.render('admin/uikit/uikit');
    },

    render: function (req, res) {
        co(function*() {
            var data = yield db_tools.queryAll('uikit');
            res.render('resource/uikit', {
                model: "resource",
                subModel: "uikit",
                category: data
            });
        });
    },

    /**
     * 获取类目
     * @param req
     * @param res
     */
    getCategory: function (req, res) {
        db_tools.queryAll('uikit').then(function (data) {
            res.send(data);
        }, function (err) {
            res.send(err);
        })
    },

    /**
     * 添加类目
     * @param req
     * @param res
     */
    addCategory: function (req, res) {
        var params = req.body;
        var formData = {
            name: params.name,
            content: []
        }
        db_tools.add('uikit', formData).then(function (data) {
            res.send({
                success: true,
                message: "添加成功！"
            });
        }, function (err) {
            res.send({
                success: false,
                message: err
            });
        })
    },

    /**
     * 编辑类目
     * @param req
     * @param res
     */
    editCategory: function (req, res) {
        var params = req.body;
        var formData = {
            _id: params.id,
            name: params.name
        }
        db_tools.edit('uikit', formData).then(function (data) {
            res.send({
                success: true,
                message: "修改成功！"
            });
        }, function (err) {
            res.send({
                success: false,
                message: err
            });
        })
    },

    /**
     * 删除类目
     * @param req
     * @param res
     */
    delCategory: function (req, res) {
        var params = req.body;
        db_tools.remove('uikit', params.id).then(function (data) {
            res.send({
                success: true,
                message: "删除成功！"
            });
        }, function (err) {
            res.send({
                success: false,
                message: err
            });
        })
    },

    /**
     * 内容编辑
     * @param req
     * @param res
     */
    uikitEdit: function (req, res) {
        var categoryId = req.params.id;
        co(function*() {
            var data = yield db_tools.queryByCondition('uikit', {
                _id: categoryId
            })
            res.render('admin/uikit/uikitEdit.ejs', {
                data: data[0]
            });
        });
    },

    /**
     * 获取内容信息
     * @param req
     * @param res
     */
    getContent: function (req, res) {
        db_tools.queryByCondition('uikit', {_id: req.body.id}).then(function (data) {
            res.send({
                success: true,
                data: data
            });
        }, function (err) {
            res.send({
                success: false,
                message: err
            });
        })
    },

    /**
     * 添加内容
     * @param req
     * @param res
     */
    addContent: function (req, res) {
        var params = req.body;
        var content = JSON.parse(params.content);
        var subDoc = {
            name: content.name,
            img_url: content.imgUrl,
            attachment_url: content.attachmentUrl
        }

        db_tools.pushSubDoc('uikit', {_id: params.id}, {content: subDoc}).then(function (data) {
            res.send({
                success: true,
                message: "添加成功！"
            });
        }, function (err) {
            res.send({
                success: false,
                message: err
            });
        })
    },

    /**
     * 移除内容
     * @param req
     * @param res
     */
    removeContent: function (req, res) {
        var params = req.body;
        var subDoc = {
            _id: params.contentId
        };
        db_tools.pullSubDoc('uikit', {_id: params.id}, {content: subDoc}).then(function (data) {
            res.send({
                success: true,
                message: "删除成功！"
            });
        }, function (err) {
            res.send({
                success: false,
                message: err
            });
        })
    }
}