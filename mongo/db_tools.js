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
    },
    create_time: String
}, {
    versionKey: false
});

/**
 * HUI语言设计表
 */
var design_doc = new Schema({
    name: String,
    content: String
}, {
    versionKey: false
});

//图标库
var icon_collection = new Schema({
    name: {
        type: String,
        require: true,
        unique: false
    },

    type: {
        type: Number,
        require: true
    },

    attachment_url: String
}, {
    versionKey: false
});

//图标
var icon = new Schema({
    name: {
        type: String,
        require: true,
        unique: false
    },

    type: {
        type: Number,
        require: true
    },

    tags: String,

    collection_id: String,

    url: String,

    downloadUrl: String,

    svgXML: String
}, {
    versionKey: false
});

var uikit_content = new Schema({
    name: String,
    img_url: String,
    attachment_url: String
}, {
    versionKey: false
});

var uikit = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },

    content: [uikit_content]
}, {
    versionKey: false
});

var comment = new Schema({
    replyer: String,
    replyTo: String,
    reply_time: Date
},{
    versionKey: false
});

var work_pool = new Schema({
    title: {
        type: String,
        require: true,
        unique: false
    },
    info: String,
    content: String,
    cover_url: String,
    pageviews: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        default: 'admin'
    },
    reply:[comment],
    create_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
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
};

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
Db_tools.edit = function (collection, editObj, queryObj) {
    var model = this.init(collection);
    var id = editObj.id || editObj._id;

    delete editObj.id;
    queryObj = queryObj || {_id: id};
    return new Promise((resolve, reject) => {
        model.findOneAndUpdate(queryObj, {
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
};

/**
 * 根据id数组批量删除
 * @param collection
 * @param ids
 * @returns {Promise}
 */
Db_tools.batchRemove = function (collection, ids) {
    var model = this.init(collection);
    return new Promise((resolve, reject) => {
        model.remove({"_id": {$in: ids}}, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(successMsg);
            }
        });
    })
};
/**
 * [query description]
 * @author zhangxin14
 * @date   2016-07-19
 * @param  {string}   collection [新增的类型(User/Article),首字母大写]
 * @param  {object}   queryObj   [查询的pageSize和pageNumber]
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
        query.sort('-create_at').exec(function (err, doc) {
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
 * @param  {查询主键}   pickObj   为空是全部查询，可以用keys代替(中间空格符号分割)
 * @return {[type]}              [description]
 */
Db_tools.queryByCondition = function (collection, queryObj, pickObj) {
    var model = this.init(collection);
    var query = model.find(queryObj, pickObj);
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

Db_tools.queryAll = function (collection) {
    var model = this.init(collection);
    var query = model.find({});
    return new Promise((resolve, reject) => {
        query.sort('-create_at').exec((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })

};

/**
 * 子文档插入数据
 * @param collection
 * @param queryObj
 * @param subObj
 * @returns {Promise}
 */
Db_tools.pushSubDoc = function (collection, queryObj, subObj) {
    var model = this.init(collection);
    return new Promise((resolve, reject)=> {
        model.findOneAndUpdate(queryObj, {$push: subObj}, {upsert: true}, function (err, doc) {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    });
};

/**
 * 删除子文档某一项
 * @param collection
 * @param queryObj
 * @param subObj
 * @returns {Promise}
 */
Db_tools.pullSubDoc = function (collection, queryObj, subObj) {
    var model = this.init(collection);
    return new Promise((resolve, reject)=> {
        model.findOneAndUpdate(queryObj, {$pull: subObj}, function (err, doc) {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    });
};


Db_tools.update = function (collection, queryObj, updateObj) {
    var model = this.init(collection);
    return new Promise(() => {
        model.update(queryObj, updateObj, function (err, doc) {
            if (err) console.log(err);
        });
    });
};
module.exports = Db_tools;
