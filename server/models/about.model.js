/**
 * Created by zhengjunling on 2017/3/29.
 */
var util = require("../util");
var db = require('../../mongo/mongo');
var co = require('co');

var About_intro = new db.Schema({
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

var AboutModel = db.model("about_intro", About_intro);

module.exports = {
    update: function (content) {
        return new Promise((resolve, reject) => {
            AboutModel.findOneAndUpdate({}, {
                content: content
            }, function (err) {
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
            AboutModel.findOne(null, {content: 1, _id: 0}, function (err, data) {
                if (err) {
                    reject(util.resParse(false, err));
                } else {
                    resolve(util.resParse(true, "", data ? data.content : ""));
                }
            });
        });
    }
};