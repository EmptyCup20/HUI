/**
 * Created by xiangxiao3 on 2016/12/14.
 */
var db_tools = require("../../../mongo/db_tools");
module.exports = {
    /**
     * 添加标签
     * @param iconObj
     * @returns {Promise}
     */
    addIcons: function (iconObj) {
        return new Promise(function(resolve, reject) {
            db_tools.add('icon', iconObj).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },
    /**
     * 获取单个 icon 的数据
     * iconId
     */
    getIconById: function (iconId) {
        return new Promise(function(resolve, reject) {
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
    delIcons : function(iconId){
        return new Promise(function(resolve, reject) {
            db_tools.remove('icon', iconId).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },
    /**
     * 获取所有icons 的数据
     * Query 查询条件
     */
    getIconsByQuery : function (query) {
        return new Promise(function(resolve, reject) {
            db_tools.queryByCondition('icon', query).then(function (data) {
                resolve(data)
            }, function (err) {
                reject(err);
            });
        })
    },
}