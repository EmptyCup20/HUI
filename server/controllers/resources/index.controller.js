/**
 * Created by xiangxiao3 on 2016/12/16.
 */
var co = require('co');
var docModel = require("../../models/resources/doc.model.js");

module.exports = {
    frontHome : function(req, res) {
        co(function*() {
            var data = yield docModel.getAllDoc({
                pageSize : 8,
                pageNumber : 1
            });

            res.render('index.ejs', {
                model: 'index',
                docs : data.rows
            });
        });
    }
}