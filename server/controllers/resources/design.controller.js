var co = require('co');
var designModel = require("../../models/resources/design.model.js");
var markdown = require("markdown").markdown;

module.exports = {
    /**
     * 获取设计md
     * 这些id暂时先写死
     */
    getDesign: function (req, res) {
        var docName,type = req.params.type.toLowerCase().trim();
        switch (type){
            case "web" :
                docName = "平台";
                break;
            case "mobile" :
                docName = "移动端";
                break;
            case "ls" :
                docName = "大屏端";
                break;
        }
        co(function*() {
            var data = yield designModel.getDocByQuery({
                name : docName
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
            var data = yield designModel.getDocByQuery({_id : docId});
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
            var data = yield designModel.updateDoc(docObj);
            res.send(data)
        });
    },

    /**
     * 获取列表
     */
    getDocList: function (req, res) {
        co(function*() {
            var data = yield designModel.getAllDoc(req.query);
            res.send(data)
        });
    }
}