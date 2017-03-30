/**
 * Created by zhengjunling on 2016/12/12.
 */
var co = require('co');
var animateModel = require("../models/animate.model.js");


module.exports = {
    render: function (req, res) {
        res.render('resource/animate', {
            model: "resource",
            subModel: "animate"
        });
    },

    getAnimateList: function (req, res) {
        var queryParams = {
            pageSize: req.query.pageSize,
            pageNo: req.query.pageNo
        }
        co(function*() {
            var data = yield animateModel.getAnimateListByPage(queryParams);
            res.send(data);
        })
    }
};