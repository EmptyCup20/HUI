/**
 * 初始化数据库
 * @author zhangxin14
 * @date 2017-03-17
 */

/**
 * 初始化hui语言集合
 */

db.design_docs.insert({
    name: '移动端',
    content: ''
});
db.design_docs.insert({
    name: '平台',
    content: ''
});
db.design_docs.insert({
    name: '大屏',
    content: ''
});

/**
 * work_pool增加pageviews字段
 */

var works = db.work_pools.find();
works.forEach(function(n){
    db.work_pools.update({"_id": n._id},{"$set":{"pageviews":0}});
});
