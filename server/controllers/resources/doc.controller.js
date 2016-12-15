/**
 * Created by zhengjunling on 2016/12/5.
 */
var co = require('co');
var docModel = require("../../models/resources/doc.model.js");
var markdown = require("markdown").markdown;

module.exports = {
    getEndDocManage : function(req, res){
        res.render("admin/doc/docManage")
    },
    getEndDocManageEdit : function(req, res){
        res.render("admin/doc/docManageEdit")
    },
    /**
     * 获取平台设计md
     * 暂时先写死
     */
    getWebDesign: function (req, res) {
        var docId = "5850e2704175e76cf9a7e84a";
        co(function*() {
            var data = yield docModel.getDocById(docId);
            res.render('design/design.ejs', {
                content: markdown.toHTML(data[0].content),
                model: "design"
            });
        });
    },

    /**
     * 根据id获取
     * 暂时先写死
     */
    getDocById: function (req, res) {
        var docId = req.query.id;
        co(function*() {
            var data = yield docModel.getDocById(docId);
            res.send({
                success: true,
                data: data.length ? data[0] : null
            });
        });
    },

    //编辑文档
    updateDoc: function (req, res) {
        var docObj = req.body;
        co(function*() {
            var data = yield docModel.updateDoc(docObj);
            res.send(data)
        });
    },

    //添加文档
    addDoc: function(req,res){
        var docObj = req.body;
        co(function*() {
            var data = yield docModel.addDoc(docObj);
            res.send(data)
        });
    },

    /**
     * 获取作品列表
     */
    getDocList: function (req, res) {
        co(function*() {
            var data = yield docModel.getAllDoc(req.query);
            res.send(data)
        });
    }
}