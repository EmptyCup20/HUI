/**
 * Created by zhengjunling on 2017/4/7.
 */
var db = require('../../mongo/mongo');
var user = new db.Schema({
    username: String,
    password: String
}, {
    versionKey: false
});
var User = db.model("user", user);

module.exports = {
    login: function (req, res) {
        User.findOne({username: req.body.username}, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send({success: false, message: '该用户不存在'});
            } else if (req.body.password == user.password) {
                req.session.username = user.username;
                res.send({success: true, message: '登录成功'});
            } else {
                res.send({success: false, message: "用户名或密码不正确，请重试"});
            }
        })
    },
    userValid: function (req, res, next) {
        if (!req.session.username) {
            if (req.url.indexOf("/signin") !== -1) {
                next();
            } else {
                res.send({
                    success: false,
                    code: "unlogin"
                });
            }
        }
    }
};


