/**
 * Created by zhengjunling on 2016/12/5.
 */
var co = require('co');
var docModel = require("../../models/resources/doc.model.js");
var markdown = require("markdown").markdown;

module.exports = {
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