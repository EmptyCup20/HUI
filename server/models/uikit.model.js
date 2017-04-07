/**
 * Created by zhengjunling on 2017/3/29.
 */
var util = require("../util");
var db = require('../../mongo/mongo');
var co = require('co');

var Uikit = new db.Schema({
    content: String,
    update_date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

var UikitModel = db.model("uikit", Uikit);

module.exports = {
    modify: function (data) {
        return new Promise((resolve, reject) => {
            UikitModel.findOneAndUpdate({}, {$set: data}, {new: true, upsert: true}, function (err) {
                if (err) {
                    reject(util.resParse(false, err));
                } else {
                    resolve(util.resParse(true, "更新成功"));
                }
            });
        });
    },

    getContent: function () {
        return new Promise((resolve, reject) => {
            UikitModel.findOne(null, {content: 1, _id: 0}, function (err, data) {
                if (err) {
                    reject(util.resParse(false, err));
                } else {
                    resolve(util.resParse(true, "", data ? data.content : ""));
                }
            });
        });
    }
};