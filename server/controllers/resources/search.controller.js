/**
 * Created by zhangxin14 on 2017/3/20.
 */

var iconModel = require("../../models/resources/icon.model");
var co = require('co');
function search(req,res){
    var icontype = req.params.icontype === "iconfont" ? 0 : 1;
    var searchKey = req.query.p;
    co(function*() {
        var data = yield iconModel.getIconsByQuery({
            type: icontype,
            name: {"$regex":searchKey}
        });
        res.render('resource/iconSearchResult.ejs', {
            model: "resource",
            subModel: req.params.icontype,
            collectionName: searchKey,
            iconList: data
        });
    });
}

module .exports = search;