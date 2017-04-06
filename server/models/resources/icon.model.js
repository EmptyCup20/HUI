/**
 * Created by xiangxiao3 on 2016/12/14.
 */
var util = require("../../util");
var db_tools = require("../../../mongo/db_tools");
var iconModel = db_tools.init('icon');
module.exports = {
    /**
     * 添加标签
     * @param iconObj
     * @returns {Promise}
     */
    addIcons: function (icons) {
        return new Promise((resolve, reject) => {
            iconModel.create(icons, function (err) {
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
     * 获取单个 icon 的数据
     * iconId
     */
    getIconById: function (iconId) {
        return new Promise(function (resolve, reject) {
            db_tools.queryByCondition('icon', {_id: iconId}).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },
    /**
     * 根据条件删除图标资源
     * @param iconObj
     */
    delIcons: function (ids) {
        return new Promise(function (resolve, reject) {
            iconModel.remove({"_id": {$in: ids}}, function (err) {
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
    },
    /**
     * 获取所有icons 的数据
     * Query 查询条件
     */
    getIconsByQuery: function (query) {
        return new Promise((resolve, reject) => {
            iconModel.find(query).exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        })
    }
};