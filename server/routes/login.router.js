var express = require('express');
var router = express.Router();
var cas = require('cas');

router.get('/', function (req, res) {
    var ticket = req.param('ticket');
    if (ticket) {
        cas.validate(ticket, function (err, status, username) {
            if (err) {
                // Handle the error
                res.send({error: err});
            } else {
                // Log the user in
                console.log({status: status, username: username});
                res.render('user/login.ejs', {
                    title: '登录'
                });
            }
        });
    } else {
        res.redirect('/');
    }

});
router.get('/validate', function (req, res) {
    res.render('user/login.ejs', {
        title: '登录'
    });
});

module.exports = router;