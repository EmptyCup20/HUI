/**
 * Created by zhengjunling on 2016/12/5.
 */
var co = require('co');
var db_tools = require("../../mongo/db_tools");
module.exports = {
    //获取md文档
    getDesignDocMd: function (req, res) {
        db_tools.queryByCondition('design_doc', {"name": "HUIDesign"}).then(function (data) {
            res.send({
                success: true,
                data: {
                    content: data.length ? data[0].content : ""
                }
            });
        }, function (err) {
            res.send({
                success: false,
                message: err
            });
        });
    },

    //获取html文档
    getDesignDocHtml: function (req, res) {
        return new Promise((resolve, reject) => {
            co(function*() {
                var data = yield db_tools.queryByCondition('design_doc', {"name": "HUIDesign"});
                resolve(data);
            });
        });
    },

    //更新设计语言文档
    updateDesignDoc: function (req, res) {
        var formData = {
            "name": "HUIDesign",
            "content": req.body.content
        };
        db_tools.edit('design_doc', formData, {"name": "HUIDesign"}).then(function (data) {
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
    }
}