/**
 * 增删改查操作
 * @Author zhangxin14
 * @Date   2016/7/19
 *
 */


var db = require('./mongo');

var Db_tools = function () {
};

var Schema = db.Schema;


var user = new Schema({
    //用户名
    author: {
        type: String,
        index: 1,
        require: true,
        unique: true
    },
    //密码
    password: String,
    //权限
    role: String,
    //邮箱
    email: String,
    //电话
    tel: String,
    //头像
    avatarUrl: {
        type: String,
        default: '/images/default/avatar.jpg'
    }
});

var iconSource = new Schema({
    //图标名称
    name: {
        type: String,
        index: 1,
        require: true,
        unique: false
    },
    //格式
    type: {
        type: String,
        require: true
    },
    //标签
    tags: String,
    //分类
    classify: String,
    size: Number
});

var successMsg = {
    "code": 0,
    "message": null,
    "data": null,
    "success": true
};

//用于存储model
var initModel = {};
/**
 * 保证单例
 * @author zhangxin14
 * @date   2016-07-21
 * @param  {string}   collection [数据库集合]
 * @return {[type]}              [description]
 */
Db_tools.init = function (collection) {
    if (initModel[collection] === undefined) {
        initModel[collection] = db.model(collection, eval(collection));
        return initModel[collection];
    }
    return initModel[collection];
}

/**
 * [add description]
 * @author zhangxin14
 * @date   2016-07-19
 * @param  {string}   collection [新增的类型(User/Article),首字母大写]
 * @param  {object}   addObj     [新的数据
 *                                User的字段(author,tel,email,team,photo);
 *                                Article的字段(title,author,createTime,content,image,describe)]
 */

Db_tools.add = function (collection, addObj) {
    var model = this.init(collection);
    return new Promise((resolve, reject) => {
            model.create(addObj, function (err, doc) {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        });
})
};

/**
 * [edit description]
 * @author zhangxin14
 * @date   2016-07-19
 * @param  {string}   collection [新增的类型(User/Article),首字母大写]
 * @param  {object}   editObj    [需要修改的数据]
 * @param  {Function} callback   回调函数
 */
Db_tools.edit = function (collection, editObj) {
    var model = this.init(collection);
    var id = editObj.id;
    delete editObj.id;
    return new Promise((resolve, reject) => {
            model.findOneAndUpdate({_id: id}, {
            $set: editObj
        }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(successMsg);
            }
        })
})
};
/**
 * [remove description]
 * @author zhangxin14
 * @date   2016-07-19
 * @param  {string}   collection [新增的类型(User/Article),首字母大写]
 * @param  {string}   removeId   [删除的项目的id]
 * @param  {Function} callback   回调函数
 * @return {[type]}              [description]
 */
Db_tools.remove = function (collection, removeId) {
    var model = this.init(collection);
    return new Promise((resolve, reject) => {
            model.remove({_id: removeId}, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(successMsg);
            }
        });
})
}
/**
 * [query description]
 * @author zhangxin14
 * @date   2016-07-19
 * @param  {string}   collection [新增的类型(User/Article),首字母大写]
 * @param  {object}   queryObj   [查询的pageSize和pageNo]
 * @param  {Function} callback   回调函数
 * @return {[type]}              [description]
 */
Db_tools.query = function (collection, queryObj) {
    var model = this.init(collection);
    var pageSize = Number(queryObj.pageSize);
    var pageNo = Number(queryObj.pageNo);
    var query = model.find({});
    //开头跳过查询的调试
    query.skip((pageNo - 1) * pageSize);
    //最多显示条数
    query.limit(pageSize);
    //计算分页数据
    return new Promise((resole, reject) => {
            query.exec(function (err, doc) {
            if (err) {
                reject(err);
            } else {
                //计算数据总数
                model.find(function (err, result) {
                    var jsonArray = {code: 0, rows: doc, message: null, total: result.length, success: true};
                    resole(jsonArray);
                });
            }
        });
})
};
/**
 * 根据单一条件查询
 * @author zhangxin14
 * @date   2016-07-25
 * @param  {string}   collection 集合名称
 * @param  {查询主键}   queryObj   string
 * @return {[type]}              [description]
 */
Db_tools.queryByCondition = function (collection, queryObj) {
    var model = this.init(collection);
    var query = model.find(queryObj);
    return new Promise((resolve, reject) => {
            query.exec(queryObj, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })
};
module.exports = Db_tools;
