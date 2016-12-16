/**
 * Created by zhengjunling on 2016/11/25.
 */
var db_tools = require("../../../mongo/db_tools");
var iconModel = require("../../models/resources/icon.model");
var iconCollectionModel = require("../../models/resources/iconCollection.model");
var request = require('request');
var fs = require('fs');
var co = require('co');

var settings = require('../../../settings' + (process.env.MODEL ? "-" + process.env.MODEL : "-dev"));
var fileServerPath = settings.fileServerPath; //图片服务器路径
var fileDocument = settings.fileDocument;//图片文件夹

module.exports = {
    /**
     * 添加图标
     * @param req
     * @param res
     */
    addIcon: function (req, res) {
        var params = req.body;
        var formData = {
            name: params.name,
            url: params.url,
            type: params.type,
            collection_id: params.collection_id,
            tags: params.tags
        };
        co(function*() {
            var data = yield iconModel.addIcons(formData);
            res.send(data)
        });
    },
    /**
     * 删除资源
     * @param req
     * @param res
     */
    delIcon: function (req, res) {
        var params = req.body;
        co(function*() {
            //删除相应的图标
            var data = yield iconModel.getIconById(params.id);

            var url = fileServerPath + "/containers/delete/" + fileDocument + "/" + data[0].url.replace(/.*\//,"")
            request.get({
                url: url
            })

            //删除字段
            yield iconModel.delIcons(params.id);

            res.send({
                success: true,
                message: "删除成功！"
            });
        });
    },
    /**
     * 获取所有icons 的数据
     * @param req
     * @param res
     */
    getAllIcons: function (req, res) {
        co(function*() {
            var data = yield iconModel.getIconsByQuery({});
            res.render('admin/icon/iconManage.ejs', {
                iconList: data
            });
        });
    },

    /**
     * 前端单个 resources 的数据
     * @param req
     * @param res
     */
    getIconsById: function (req, res) {
        var iconId = req.params.iconId;
        co(function*() {
            var data = yield iconModel.getIconById(iconId)
            res.render('resource/iconDetail.ejs', {
                model: "resource",
                results: data
            });
        });
    },
    /**
     * 获取svg图标集
     * @param req
     * @param res
     * @returns {Promise}
     */
    getCollections: function (req, res) {
        co(function*() {
            var iconTypes = yield iconCollectionModel.getCollectionByQuery({
                type: "svg"
            });
            var icons = yield iconModel.getIconsByQuery({
                type: "svg"
            });
            res.render('resource/iconfont.ejs', {
                model: "resource",
                subModel: "iconfont",
                icons: icons,
                iconTypes: iconTypes
            });
        });
    },

    /**
     * 获取彩色图标库
     * @param req
     * @param res
     */
    getColorIconCollections: function (req, res) {
        co(function*() {
            var iconTypes = yield iconCollectionModel.getCollectionByQuery({
                type: "png"
            });
            var icons = yield iconModel.getIconsByQuery({
                type: "png"
            });
            res.render('resource/coloricon.ejs', {
                model: "resource",
                subModel: "coloricon",
                icons: icons,
                iconTypes: iconTypes
            });
        });
    },
    /**
     * 根据类型获取图标集
     * @param type
     * @returns {Promise}
     */
    getIconByCollection: function (req, res) {
        var typeId = req.params.typeId;
        co(function*() {
            var collection = yield iconCollectionModel.getCollectionByQuery({_id: typeId});
            var data = yield iconModel.getIconsByQuery({
                collection_id: typeId
            });
            res.render('resource/iconfontType.ejs', {
                model: "resource",
                subModel: "iconfont",
                collectionName: collection[0].name,
                iconList: data
            });
        });
    },

    /**
     * 根据图标库获取彩色图标
     * @param req
     * @param res
     */
    getColorIconByCollection: function (req, res) {
        var typeId = req.params.typeId;
        co(function*() {
            var collection = yield iconCollectionModel.getCollectionByQuery({id: typeId});
            var data = yield iconModel.getIconsByQuery({
                collection_id: typeId
            });
            res.render('resource/iconfontType.ejs', {
                model: "resource",
                subModel: "coloricon",
                iconCollection: collection[0],
                iconList: data
            });
        });
    }
}