/**
 * Created by zhengjunling on 2016/11/25.
 */

var mongoose = require("mongoose");

var db = mongoose.connect("mongodb://10.33.31.234/hui", function (err) {
    if (err) {
        console.log(err);
    }

    console.log("Connect to mongoDB success!");
});

module.exports = db;
