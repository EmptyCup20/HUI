/**
 * Created by zhengjunling on 2017/3/29.
 */
var util = require("../util");
var db = require('../../mongo/mongo');

var Uikit = new db.Schema({
    //标题
    title: String,
    //内容
    content: String,
    //封面
    cover_img_url: String,
    //附件下载链接
    attachment_url: String,
    //附件名
    attachment_name: String,
    //创建日期
    create_date: {
        type: Date,
        default: Date.now
    },
    //更新日期
    update_date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

var UikitModel = db.model("uikit", Uikit);

module.exports = {
    /**
     * 根据id获取uikit内容
     * @param id
     * @returns {Promise}
     */
    getUikitInfoById: function (id) {
        return new Promise((resolve, reject) => {
            UikitModel.find({_id: id}).exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc[0]);
                }
            })
        });
    },

    /**
     * 根据页码获取uikit列表
     * @param queryObj
     * @returns {Promise}
     */
    getUikitByPage: function (queryObj) {
        var pageSize = Number(queryObj.pageSize);
        var pageNo = Number(queryObj.pageNo);
        var queryParams = queryObj.searchText ? {"title": new RegExp(queryObj.searchText)} : {};
        var query = UikitModel.find(queryParams);
        //开头跳过查询的调试
        query.skip((pageNo - 1) * pageSize);
        //最多显示条数
        query.limit(pageSize);
        //计算分页数据
        return new Promise((resolve, reject) => {
            UikitModel.count({}, function (err, count) {
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

    /**
     * 添加uikit
     * @param data
     * @returns {Promise}
     */
    add: function (data) {
        return new Promise((resolve, reject) => {
            UikitModel.create(data, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        })
    },

    /**
     * 编辑uikit内容
     * @param data
     * @returns {Promise}
     */
    modify: function (data) {
        return new Promise((resolve, reject) => {
            UikitModel.findOneAndUpdate({_id: data._id}, {$set: data}, {new: true}, function (err, doc) {
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
            UikitModel.remove({"_id": {$in: ids}}, function (err) {
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