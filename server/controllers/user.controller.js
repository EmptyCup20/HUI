/**
 * Created by zhengjunling on 2017/4/7.
 */
var jwt = require("jsonwebtoken");
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
                var token = jwt.sign(user._id, 'asd12345', {
                    'expiresIn': 15 * 1440 * 60000 // 设置过期时间
                });
                res.send({success: true, message: '登录成功', token: token});
            } else {
                res.send({success: false, message: "用户名或密码不正确，请重试"});
            }
        })
    },
    userValid: function (req, res, next) {
        if (req.method === "OPTIONS") {
            return next();
        }
        if (req.url.indexOf("/signin") !== -1) {
            return next();
        }
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        if(!token){
            res.send({
                success: false,
                code: "unlogin"
            });
        }else{
            jwt.verify(token, "asd12345", function (err, decoded) {
                if (err) {
                    res.send({
                        success: false,
                        code: "unlogin"
                    });
                } else {
                    next();
                }
            })
        }

    }
};


