/**
 * Created by zhengjunling on 2017/4/1.
 */
var util = require("../util");
var db = require('../../mongo/mongo');
var comment = new db.Schema({
    content: String,
    author: String,
    replyTo: String,
    reply_time: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

var Article = new db.Schema({
    title: {
        type: String,
        require: true,
        unique: false
    },
    info: String,
    content: String,
    cover_url: String,
    pageviews: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        default: 'admin'
    },
    reply: [comment],
    create_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

var ArticleModel = db.model("article", Article);

module.exports = {
    /**
     * 根据id获取文章信息
     * @param id
     * @returns {Promise}
     */
    getArticleInfoById: function (id) {
        return new Promise((resolve, reject) => {
            ArticleModel.find({_id: id}).exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc[0]);
                }
            })
        });
    },

    /**
     * 根据页码获取文章列表
     * @returns {Promise}
     */
    getArticleListByPage: function (queryObj) {
        var pageSize = Number(queryObj.pageSize);
        var pageNo = Number(queryObj.pageNo);
        var queryParams = queryObj.searchText ? {"title": new RegExp(queryObj.searchText)} : {};
        var query = ArticleModel.find(queryParams);
        //开头跳过查询的调试
        query.skip((pageNo - 1) * pageSize);
        //最多显示条数
        query.limit(pageSize);
        //计算分页数据
        return new Promise((resolve, reject) => {
            ArticleModel.count({}, function (err, count) {
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

        })
    },

    insertComment: function (queryObj, subObj) {
        return new Promise((resolve, reject) => {
            ArticleModel.findOneAndUpdate(queryObj, {$push: subObj}, {new: true, upsert: true}, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc.reply.pop());
                }
            })
        })
    },

    /**
     * 添加文章
     * @param data
     * @returns {Promise}
     */
    add: function (data) {
        return new Promise((resolve, reject) => {
            ArticleModel.create(data, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        })
    },

    /**
     * 批量删除文章
     * @param ids
     * @returns {Promise}
     */
    del: function (ids) {
        return new Promise((resolve, reject) => {
            ArticleModel.remove({"_id": {$in: ids}}, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })
    },

    /**
     * 编辑文章
     * @param data
     * @returns {Promise}
     */
    modify: function (data) {
        return new Promise((resolve, reject) => {
            ArticleModel.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    }
};