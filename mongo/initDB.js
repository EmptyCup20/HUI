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

db.work_pools.find().forEach(function(n){
    db.work_pools.update({"_id": n._id},{"$set":{"pageviews":NumberInt(0)}});
});

/**
 * 将type字段的值：svg和png改成0和1
 */
db.icons.find().forEach(function(n){
    n.type = n.type == "svg" ? NumberInt(0) : NumberInt(1);
    db.icons.save(n);
});

/**
 * 增加评论回复字段
 */
db.work_pools.find().forEach(function(n){
    db.work_pools.update({"_id": n._id},{"$set":{"reply":[]}});
});
