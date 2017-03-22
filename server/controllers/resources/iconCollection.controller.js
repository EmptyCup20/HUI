/**
 * Created by zhengjunling on 2016/12/9.
 */
var iconCollectionModel = require("../../models/resources/iconCollection.model");
var iconModel = require("../../models/resources/icon.model");
var co = require('co');

module.exports = {
    /**
     * 图标库列表页面
     * @param req
     * @param res
     */
    render: function (req, res) {
        res.render("admin/icon/collectionManage");
    },

    /**
     * 添加图标库页面
     * @param req
     * @param res
     */
    collectionAddRender: function (req, res) {
        res.render("admin/icon/collectionAdd");
    },

    /**
     * 编辑图标库页面
     * @param req
     * @param res
     */
    getCollectionInfo: function (req, res) {
        var collectionId = req.query.id;
        co(function*() {
            var collection = yield iconCollectionModel.getCollectionByQuery({_id: collectionId});
            var icons = yield iconModel.getIconsByQuery({collection_id: collectionId});
            collection = collection[0].toObject();
            collection.icons = icons;
            res.send({
                success: true,
                data: collection
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
        co(function*() {
            var data = yield iconCollectionModel.getCollectionByPage(queryParams);
            res.send(data);
        })
    },

    addCollection: function (req, res) {
        co(function*() {
            var data = yield iconCollectionModel.addCollection(req.body);
            res.send({
                success: true,
                message: "添加成功！",
                data: data
            });
        });
    },

    /**
     * 添加/修改图标库
     * @param req
     * @param res
     */
    updateCollection: function (req, res) {
        var params = JSON.parse(req.body.collection);
        var formData = {
            id: params.id,
            name: params.name,
            type: params.type,
            attachment_url: params.attachmentUrl
        };
        var method = formData.id ? "edit" : "add";
        co(function*() {
            var data = yield iconCollectionModel.updateCollection(method, formData);
            if (params.icons && params.icons.length > 0) {
                params.icons.forEach(function (e) {
                    e.collection_id = data._id;
                })
                iconModel.addIcons(params.icons);
                res.send({
                    success: true,
                    message: formData.id ? "修改成功" : "添加成功！"
                });
            } else {
                res.send({
                    success: true,
                    message: formData.id ? "修改成功" : "添加成功！"
                });
            }
        })
    },

    /**
     * 删除图标库
     * @param req
     * @param res
     */
    delCollection: function (req, res) {
        co(function*() {
            var data = yield iconCollectionModel.delCollection(req.body.ids);
            res.send(data);
        })
    }

};