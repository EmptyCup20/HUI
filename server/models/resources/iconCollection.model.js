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
    },
    /**
     * 获取图标id获取分类详情
     * @param query
     * @returns {Promise}
     */
    getCollectionByPage: function (query) {
        return new Promise(function(resolve, reject) {
            db_tools.query('icon_collection', query).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },
    /**
     * 更新图标库
     * @param method
     * @param query
     * @returns {Promise}
     */
    updateCollection : function(method, query){
        return new Promise(function(resolve, reject) {
            db_tools[method]('icon_collection', query).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },
    /**
     * 删除图标库
     * @param collectionId
     */
    delCollection : function(collectionId){
        return new Promise(function(resolve, reject) {
            db_tools.remove('icon_collection', collectionId).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    }
}