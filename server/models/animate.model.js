/**
 * Created by zhengjunling on 2017/3/30.
 */
var util = require("../util");
var db = require('../../mongo/mongo');

var Animate = new db.Schema({
    //标题
    title: String,
    //附件名称
    attachment_name: String,
    //附件地址
    attachment_url: String,
    //封面
    cover_img_url: String,
    //内容
    content: String,

    create_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

var AnimateModel = db.model("animate", Animate);

module.exports = {
    getAnimateInfoById: function (id) {
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

    getAnimateListByPage: function (queryObj) {
        var pageSize = Number(queryObj.pageSize);
        var pageNo = Number(queryObj.pageNo);
        var queryParams = queryObj.searchText ? {"title": new RegExp(queryObj.searchText)} : {};
        var query = AnimateModel.find(queryParams);
        //开头跳过查询的调试
        query.skip((pageNo - 1) * pageSize);
        //最多显示条数
        query.limit(pageSize);
        //计算分页数据
        return new Promise((resolve, reject) => {
            AnimateModel.count({}, function (err, count) {
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

    add: function (data) {
        return new Promise((resolve, reject) => {
            AnimateModel.create(data, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        })
    },

    update: function (data) {
        return new Promise((resolve, reject) => {
            AnimateModel.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },

    del: function (ids) {
        return new Promise((resolve, reject) => {
            AnimateModel.remove({"_id": {$in: ids}}, function (err) {
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