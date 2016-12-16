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
     * 获取设计md
     * 这些id暂时先写死
     */
    getDesign: function (req, res) {
        var docName,type = req.params.type.toLowerCase().trim();
        switch (type){
            case "web" :
                docName = "平台规范"
                break
            case "mobile" :
                docName = "移动端规范"
                break
            case "ls" :
                docName = "大屏端规范"
                break
        }
        co(function*() {
            var data = yield docModel.getDocByQuery({
                title : docName
            });
            res.render('design/design.ejs', {
                content: markdown.toHTML(data[0].content),
                model: "design",
                type: type
            });
        });
    },

    /**
     * 根据id获取
     */
    getDocById: function (req, res) {
        var docId = req.query.id;
        co(function*() {
            var data = yield docModel.getDocByQuery({_id : docId});
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

    //添加文档
    delDoc: function(req,res){
        var docId = req.body.id;
        co(function*() {
            var data = yield docModel.delDoc(docId);
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