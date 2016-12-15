/**
 * Created by xiangxiao3 on 2016/12/14.
 */
var db_tools = require("../../../mongo/db_tools");
module.exports = {
    /**
     * 添加文档
     * @param docObj object
     * @returns {Promise}
     */
    addDoc : function(docObj){
        return new Promise(function(resolve, reject) {
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
    updateDoc : function(docObj){
        return new Promise(function(resolve, reject) {
            db_tools.edit('work_pool', docObj).then(function (data) {
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
    getAllDoc : function(query){
        return new Promise(function(resolve, reject) {
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
    getDocById : function(docId){
        return new Promise(function(resolve, reject) {
            db_tools.queryByCondition('work_pool', {"_id": docId}).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },

}