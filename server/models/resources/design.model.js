var db_tools = require("../../../mongo/db_tools");
module.exports = {
    /**
     * 编辑文档
     * @param docObj object
     * @returns {Promise}
     */
    updateDoc : function(docObj){
        return new Promise(function(resolve, reject) {
            db_tools.edit('design_doc', docObj).then(function (data) {
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
    getDocByQuery : function(query){
        return new Promise(function(resolve, reject) {
            db_tools.queryByCondition('design_doc', query).then(function (data) {
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
            db_tools.query('design_doc', query).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },
}