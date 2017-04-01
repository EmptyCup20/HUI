/**
 * Created by zhengjunling on 2017/4/1.
 */
var util = require("../util");
var db = require('../../mongo/mongo');
var co = require('co');
var comment = new Schema({
    content: String,
    replyer: String,
    replyTo: String,
    reply_time: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false
});

var Artical = new Schema({
    title: {
        type: String,
        require: true,
        unique: false
    },
    info: String,
    content: String,
    cover_url: String,
    pageviews: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        default: 'admin'
    },
    reply:[comment],
    create_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

var ArticalModel = db.model("artical", Artical);