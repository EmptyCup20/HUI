var co = require('co');
var showdown = require('showdown');
var util = require("../util");
var designModel = require("../models/design.model.js");
var converter = new showdown.Converter();

module.exports = {
    /**
     * 获取设计md
     * 这些id暂时先写死
     */
    renderPage: function (req, res) {
        var type = req.params.type;
        co(function*() {
            var data = yield designModel.getDocByQuery({
                type: type
            });
            var content = data ? converter.makeHtml(data.content) : "";
            res.render('design/design.ejs', {
                content: content,
                model: "design",
                type: type,
                loginUser: req.session.cas && req.session.cas.user ? req.session.cas.user : null
            });
        });
    },

    getDocInfo: function (req, res) {
        co(function*() {
            var data = yield designModel.getDocByQuery({
                type: req.params.type
            });
            res.send(util.resParse(true, "", data || ""));
        });
    },

    //编辑文档
    modify: function (req, res) {
        var formData = {
            type: req.body.type,
            content: req.body.content
        };
        co(function*() {
            var data = yield designModel.modify(formData);
            res.send(util.resParse(true, "更新成功", data));
        });
    }
}