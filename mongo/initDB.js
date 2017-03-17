/**
 * 初始化数据库
 * @author zhangxin14
 * @date 2017-03-17
 */

var db_tools = require('./db_tools');

/**
 * 初始化hui语言集合
 */

db_tools.add('design_doc',{
    name: '移动端',
    content: ''
});
db_tools.add('design_doc',{
    name: '平台',
    content: ''
});
db_tools.add('design_doc',{
    name: '大屏',
    content: ''
});

console.log('初始化成功');