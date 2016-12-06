/**
 * Created by zhengjunling on 2016/12/5.
 */
var express = require("express");
var router = express.Router();
var docController = require("../controllers/doc.controller");
var co = require('co');
var markdown = require("markdown").markdown;


router.get('/', function (req, res) {
    co(function*() {
        var data = yield docController.getDesignDocHtml();
        var content = data.length ? data[0].content : "";
        res.render('design/designDoc.ejs', {
            content: markdown.toHTML(content),
            model: "design"
        });
    });
});

module.exports = router;