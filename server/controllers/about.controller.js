/**
 * Created by zhengjunling on 2017/3/29.
 */
var co = require('co');
var showdown = require('showdown');
var aboutModel = require("../models/about.model.js");
var converter = new showdown.Converter();

module.exports = {
    renderPage: function (req, res) {
        co(function*() {
            var data = yield aboutModel.getContent();
            res.render('about/about.ejs', {
                model: "about",
                content: converter.makeHtml(data.data)
            });
        })
    },

    update: function (req, res) {
        co(function*() {
            var data = yield aboutModel.update(req.body.content);
            res.send(data);
        });
    },

    getContent: function (req, res) {
        co(function*() {
            var data = yield aboutModel.getContent();
            res.send(data);
        });
    }
};