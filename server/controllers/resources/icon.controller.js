/**
 * Created by zhengjunling on 2016/11/25.
 */
var db_tools = require("../../../mongo/db_tools");
var iconModel = require("../../models/resources/icon.model");
var iconCollectionModel = require("../../models/resources/iconCollection.model");
var fileModel = require("../../models/resources/file.model");
var request = require('request');
var fs = require('fs');
var co = require('co');

var settings = require('../../../settings' + (process.env.MODEL ? "-" + process.env.MODEL : "-dev"));
var fileServerPath = settings.fileServerPath; //图片服务器路径
var fileDocument = settings.fileDocument;//图片文件夹

var onError = function (err) {
    console.log(err);
};

function getSvgXml(svgUrl, cb) {
    request.get(svgUrl, function (error, response, body) {
        cb && cb(body);
    })
}

module.exports = {
    /**
     * 删除资源
     * @param req
     * @param res
     */
    delIcon: function (req, res) {
        var params = req.body;
        co(function*() {
            var delRes = yield iconModel.delIcons(params.ids);
            res.send(delRes);
        }).catch(onError);
    },

    getIconsByCollection: function (req, res) {
        co(function*() {
            var collection = yield iconModel.getIconsByQuery({collection_id: req.query.id});
            res.send(collection);
        })
    },

    /**
     * 前端单个 resources 的数据
     * @param req
     * @param res
     */
    getIconsById: function (req, res) {
        var iconId = req.params.iconId;
        co(function*() {
            var data = yield iconModel.getIconById(iconId);
            res.render('resource/iconDetail.ejs', {
                model: "resource",
                results: data
            });
        }).catch(onError);
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
                type: 0
            });
            var icons = yield iconModel.getIconsByQuery({
                type: 0
            });
            res.render('resource/iconfont.ejs', {
                model: "resource",
                subModel: "iconfont",
                icons: icons,
                iconTypes: iconTypes
            });
        }).catch(onError);
    },

    /**
     * 获取彩色图标库
     * @param req
     * @param res
     */
    getColorIconCollections: function (req, res) {
        co(function*() {
            var iconTypes = yield iconCollectionModel.getCollectionByQuery({
                type: 1
            });
            var icons = yield iconModel.getIconsByQuery({
                type: 1
            });
            res.render('resource/coloricon.ejs', {
                model: "resource",
                subModel: "coloricon",
                icons: icons,
                iconTypes: iconTypes
            });
        }).catch(onError);
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
                url: collection[0].attachment_url,
                collectionName: collection[0].name,
                typeId: typeId,
                iconList: data
            });
        }).catch(onError);
    },

    /**
     * 根据图标库获取彩色图标
     * @param req
     * @param res
     */
    getColorIconByCollection: function (req, res) {
        var typeId = req.params.typeId;
        co(function*() {
            var collection = yield iconCollectionModel.getCollectionByQuery({_id: typeId});
            var data = yield iconModel.getIconsByQuery({
                collection_id: typeId
            });
            res.render('resource/coloriconType.ejs', {
                model: "resource",
                subModel: "coloricon",
                collectionName: collection[0].name,
                url: collection[0].attachment_url,
                iconList: data
            });
        }).catch(onError);
    }
}