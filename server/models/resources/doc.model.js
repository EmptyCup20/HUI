/**
 * Created by xiangxiao3 on 2016/12/14.
 */
var util = require("../util");
var db = require('../../mongo/mongo');
var co = require('co');
var comment = new Schema({
    content: String,
    replyer: String,
    replyTo: String,
    reply_time: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false
});

var Artical = new Schema({
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
    reply:[comment],
    create_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

var ArticalModel = db.model("artical", Artical);

module.exports = {
    getArticalInfoById: function (id) {
        return new Promise((resolve, reject) => {
            AnimateModel.find({_id: id}).exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc[0]);
                }
            })
        });
    },
    /**
     * 添加文档
     * @param docObj object
     * @returns {Promise}
     */
    addDoc: function (docObj) {
        return new Promise(function (resolve, reject) {
            db_tools.add('work_pool', docObj).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },
    /**
     * 编辑文档
     * @param docObj object
     * @returns {Promise}
     */
    updateDoc: function (docObj) {
        return new Promise(function (resolve, reject) {
            db_tools.edit('work_pool', docObj).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },
    delDoc: function (docId) {
        return new Promise(function (resolve, reject) {
            db_tools.remove('work_pool', docId).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },
    /**
     * 过滤所有文档信息，query为查询条件，
     * @param query object
     * @returns {Promise}
     */
    getAllDoc: function (query) {
        return new Promise(function (resolve, reject) {
            db_tools.query('work_pool', query).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },
    /**
     * 根据id获取内容
     * @param docId
     * @returns {Promise}
     */
    getDocByQuery: function (query) {
        return new Promise(function (resolve, reject) {
            db_tools.queryByCondition('work_pool', query).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    }
};