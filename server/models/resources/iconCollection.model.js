/**
 * Created by xiangxiao3 on 2016/12/14.
 */
var util = require("../../util");
var db = require('../../../mongo/mongo');
//图标库
var icon_collection = new db.Schema({
    name: {
        type: String,
        require: true,
        unique: false
    },

    type: {
        type: Number,
        require: true
    },

    attachment_name: String,

    attachment_url: String,

    create_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

var IconCollectionModel = db.model("icon_collection", icon_collection);

module.exports = {
    /**
     * 根据图标库id获取图标库基本信息
     * @param query
     * @returns {Promise}
     */
    getCollectionById: function (id) {
        return new Promise((resolve, reject) => {
            IconCollectionModel.find({_id: id}).exec((err, doc) => {
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
            IconCollectionModel.find(queryObj).exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        });
    },

    /**
     * 获取图标库列表
     * @param query
     * @returns {Promise}
     */
    getCollectionByPage: function (queryObj) {
        var pageSize = Number(queryObj.pageSize);
        var pageNo = Number(queryObj.pageNo);
        var queryParams = queryObj.searchText ? {"name": new RegExp(queryObj.searchText)} : {};
        var query = IconCollectionModel.find(queryParams);
        //开头跳过查询的调试
        query.skip((pageNo - 1) * pageSize);
        //最多显示条数
        query.limit(pageSize);
        //计算分页数据
        return new Promise((resolve, reject) => {
            IconCollectionModel.count({}, function (err, count) {
                if (err) {
                    reject(err);
                } else {
                    query.sort('-create_at').exec(function (err, doc) {
                        if (err) {
                            reject(err);
                        } else {
                            var jsonArray = {code: 0, rows: doc, message: null, total: count, success: true};
                            resolve(jsonArray);
                        }
                    });
                }
            });
        });
    },

    /**
     * 添加图标库
     * @param data
     * @returns {Promise}
     */
    addCollection: function (data) {
        return new Promise((resolve, reject) => {
            IconCollectionModel.create(data, function (err) {
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
            IconCollectionModel.findOneAndUpdate({_id: params._id}, {$set: params}, {new: true}, function (err) {
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
            IconCollectionModel.remove({"_id": {$in: ids}}, function (err) {
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
};