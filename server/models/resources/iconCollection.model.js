/**
 * Created by xiangxiao3 on 2016/12/14.
 */
var util = require("../../util");
var db_tools = require("../../../mongo/db_tools");

var iconCollectionModel = db_tools.init('icon_collection');

module.exports = {
    /**
     * 获取图标id获取分类详情
     * @param query
     * @returns {Promise}
     */
    getCollectionById: function (id) {
        return new Promise((resolve, reject) => {
            iconCollectionModel.find({_id: id}).exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc[0]);
                }
            })
        });
    },
    /**
     * 获取图标id获取分类详情
     * @param query
     * @returns {Promise}
     */
    getCollectionByQuery: function (queryObj) {
        return new Promise((resolve, reject) => {
            iconCollectionModel.find(queryObj).exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        });
    },

    /**
     * 获取图标id获取分类详情
     * @param query
     * @returns {Promise}
     */
    getCollectionByPage: function (query) {
        return new Promise(function (resolve, reject) {
            db_tools.query('icon_collection', query).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },

    /**
     * 添加图标库
     * @param data
     * @returns {Promise}
     */
    addCollection: function (data) {
        return new Promise((resolve, reject) => {
            iconCollectionModel.create(data, function (err) {
                if (err) {
                    reject(util.resParse(false, err));
                } else {
                    var docs = Array.prototype.slice.call(arguments, 1);
                    resolve(util.resParse(true, "添加成功", docs[0]));
                }
            });
        });
    },
    /**
     * 更新图标库
     * @param method
     * @param query
     * @returns {Promise}
     */
    updateCollection: function (params) {
        return new Promise((resolve, reject) => {
            iconCollectionModel.findOneAndUpdate({_id: params._id}, {$set: params}, {new: true}, function (err) {
                if (err) {
                    reject(util.resParse(false, err));
                } else {
                    var docs = Array.prototype.slice.call(arguments, 1);
                    resolve(util.resParse(true, "更新成功", docs[0]));
                }
            });
        });
    },
    /**
     * 删除图标库
     * @param collectionId
     */
    delCollection: function (ids) {
        return new Promise((resolve, reject) => {
            iconCollectionModel.remove({"_id": {$in: ids}}, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        success: true,
                        message: "删除成功！"
                    });
                }
            });
        })
    }
}