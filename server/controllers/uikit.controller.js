/**
 * Created by zhengjunling on 2017/4/6.
 */
var co = require('co');
var showdown = require('showdown');
var uikitModel = require("../models/uikit.model.js");
var converter = new showdown.Converter();

module.exports = {
    renderPage: function (req, res) {
        co(function*() {
            var data = yield uikitModel.getContent();
            res.render('resource/uikit.ejs', {
                model: "resource",
                subModel: "uikit",
                content: converter.makeHtml(data.content),
                attachment_url: data.attachment_url,
                loginUser: req.session.cas && req.session.cas.user ? req.session.cas.user : null
            });
        })
    },

    modify: function (req, res) {
        co(function*() {
            var data = yield uikitModel.modify(req.body);
            res.send(data);
        });
    },

    getContent: function (req, res) {
        co(function*() {
            var data = yield uikitModel.getContent();
            res.send(data);
        });
    }
};