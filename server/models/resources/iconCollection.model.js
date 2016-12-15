/**
 * Created by xiangxiao3 on 2016/12/14.
 */
var db_tools = require("../../../mongo/db_tools");

module.exports = {
    /**
     * 获取图标id获取分类详情
     * @param query
     * @returns {Promise}
     */
    getCollectionByQuery: function (query) {
        return new Promise(function(resolve, reject) {
            db_tools.queryByCondition('icon_collection', query).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    }
}