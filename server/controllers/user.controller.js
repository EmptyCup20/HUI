/**
 * Created by zhengjunling on 2017/4/7.
 */
var settings = require('../../settings' + (process.env.MODEL ? "-" + process.env.MODEL : "-dev"));
var util = require("../util");
var db = require('../../mongo/mongo');
var user = new db.Schema({
    username: String,
    password: String
}, {
    versionKey: false
});

var User = db.model("user", user);

var adminLoginPath = settings.adminLoginPath; //后台登录页面
var adminIndexPath = settings.adminIndexPath;//后台管理页面

module.exports = {
    login: function (req, res) {
        User.one({username: req.body.username}, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({success: false, message: '认证失败，用户名找不到'});
            }
        })
    },
    userValid: function (req, res, next) {
        if (!req.session.user) {
            if (req.url == "/login") {
                next();
            } else {
                res.statusCode = 401;
                res.send({});
            }
        }
    }
};


