/**
 * Created by zhengjunling on 2016/11/28.
 */
var express = require('express');
var router = express.Router();

router.post('/login', function(req, res) {
	console.log(req.body);
});

module.exports = router;
