/**
 * Created by zhengjunling on 2016/12/9.
 */
var db_tools = require("../../mongo/db_tools");
var co = require('co');

module.exports = {
    /**
     * 图标库列表页面
     * @param req
     * @param res
     */
    render: function (req, res) {
        res.render("admin/collectionManage");
    },

    /**
     * 添加图标库页面
     * @param req
     * @param res
     */
    collectionAddRender: function (req, res) {
        res.render("admin/collectionAdd");
    },

    /**
     * 编辑图标库页面
     * @param req
     * @param res
     */
    collectionEditRender: function (req, res) {
        var collectionId = req.params.collectionId;
        co(function*() {
            var collection = yield db_tools.queryByCondition('icon_collection', {_id: collectionId});
            var icons = yield db_tools.queryByCondition('icon', {collection_id: collectionId});
            res.render("admin/collectionEdit", {
                collection: collection[0],
                icons: icons
            });
        })
    },

    /**
     * 获取图标库
     * @param req
     * @param res
     */
    getCollection: function (req, res) {
        var queryParams = {
            pageSize: req.query.pageSize,
            pageNo: req.query.pageNo
        }
        db_tools.query('icon_collection', queryParams).then(function (data) {
            res.send(data);
        }, function (err) {
            res.send(err);
        })
    },

    /**
     * 添加图标库
     * @param req
     * @param res
     */
    addCollection: function (req, res) {
        var params = JSON.parse(req.body.collection);
        var formData = {
            name: params.name,
            type: params.type,
            attachment_url: params.attachmentUrl
        };
        db_tools.add('icon_collection', formData).then(function (data) {
            params.icons.forEach(function (e) {
                e.collection_id = data._id;
            })
            db_tools.add('icon', params.icons).then(function (data) {
                res.send({
                    success: true,
                    message: "添加成功！"
                });
            })
        }, function (err) {
            res.send({
                success: false,
                message: err
            });
        });
    },

    /**
     * 删除图标库
     * @param req
     * @param res
     */
    delCollection: function (req, res) {
        db_tools.remove('icon_collection', req.body.id).then(function (data) {
            res.send({
                success: true,
                message: "删除成功！",
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
     * 更新图标库
     * @param req
     * @param res
     */
    updateIconCollection: function (req, res) {

    }

};