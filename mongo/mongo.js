/**
 * Created by zhengjunling on 2016/11/25.
 */

var settings = require('../settings' + (process.env.MODEL ? "-" + process.env.MODEL : "-dev"));
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var db = mongoose.connect(settings.db, function (err) {
    if (err) {
        console.log(err);
    }

    console.log("Connect to mongoDB success!");
});

module.exports = db;
