/**
 * Created by zhengjunling on 2017/3/30.
 */
var util = require("../util");
var db = require('../../mongo/mongo');
var co = require('co');

var Animate = new db.Schema({
    title: String,
    img_url: String,
    attachment_url: String,
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
    getAnimateListByPage:function(queryObj){
        var pageSize = Number(queryObj.pageSize);
        var pageNo = Number(queryObj.pageNo);
        var query = AnimateModel.find({});
        //开头跳过查询的调试
        query.skip((pageNo - 1) * pageSize);
        //最多显示条数
        query.limit(pageSize);
        //计算分页数据
        return new Promise((resole, reject) => {
            query.sort('-create_at').exec(function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    //计算数据总数
                    AnimateModel.find(function (err, result) {
                        var jsonArray = {code: 0, rows: doc, message: null, total: result.length, success: true};
                        resole(jsonArray);
                    });
                }
            });
        })
    }
};