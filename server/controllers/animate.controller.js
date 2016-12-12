/**
 * Created by zhengjunling on 2016/12/12.
 */
var db_tools = require("../../mongo/db_tools");
var co = require('co');


module.exports = {
    render: function (req, res) {
        res.render('resource/animate', {
            model: "resource",
            subModel: "animate"
        });
    }
};