/**
 * Created by zhengjunling on 2016/12/5.
 */
var co = require('co');
var db_tools = require("../../mongo/db_tools");
module.exports = {
    //获取md文档
    getWorkMd: function (req, res) {
        db_tools.queryByCondition('work_pool', {"_id": req.query.id},'cover_url title content').then(function (data) {
            res.send({
                success: true,
                data: data.length ? data[0] : null
            });
        }, function (err) {
            res.send({
                success: false,
                message: err
            });
        });
    },

    //获取html文档
    getWorkHtml: function (req, res) {
        return new Promise((resolve, reject) => {
            co(function*() {
                var data = yield db_tools.queryByCondition('work_pool', {"name": "HUIDesign"});
                resolve(data);
            });
        });
    },

    //更新文档
    updateWork: function (req, res) {
        db_tools.edit('work_pool', req.body).then(function (data) {
            res.send({
                success: true,
                message: "更新成功！"
            });
            return;
        }, function (err) {
            res.send({
                success: false,
                message: "提交失败！"
            });
        });
    },

    addWork: function(req,res){
        db_tools.add('work_pool', req.body).then(function (data) {
            res.send({
                success: true,
                message: "保存成功！"
            });
            return;
        }, function (err) {
            res.send({
                success: false,
                message: "提交失败！"
            });
        });
    },

    /**
     * 获取作品列表
     */

    getWorkList: function (req, res) {
        db_tools.query('work_pool', req.query).then(function (data) {
            res.send(data)
        }, function (err) {
            res.send({
                success:false,
                message: '查询失败！'
            })
        })
    }
};