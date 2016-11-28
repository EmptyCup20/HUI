/**
 * Created by zhengjunling on 2016/11/25.
 */
var express = require("express");
var router = express.Router();
var path = require('path');

router.get("/", function(req,res){
    res.sendFile(path.resolve(__dirname, '../../app/views/index.html'));
});

module.exports = router;