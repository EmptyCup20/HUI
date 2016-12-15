/**
 * Created by zhengjunling on 2016/11/29.
 */
var express = require("express");
var router = express.Router();
var db_tools = require('../../../mongo/db_tools');
var moment = require('moment');
var markdown = require("markdown").markdown;


router.get('/', function (req, res) {
    db_tools.queryAll('work_pool').then(function (data) {
        res.render('works/works.ejs', {
            model: 'works',
            moment: moment,
            workList: data
        });
    }, function (err) {
        console.log(err);
    });
});

router.get('/workDetail/:id', function (req, res) {
        db_tools.queryByCondition('work_pool', {"_id": req.params.id}).then(function(data){
            var data = data.length ? data[0] : "";
            res.render('works/workDetail.ejs', {
                content: markdown.toHTML(data.content),
                workInfo: data,
                moment: moment,
                model: "works"
            });
        },function(err){
            console.log(err);
        });

});

module.exports = router;