/**
 * Created by zhangxin14 on 2017/3/13.
 */
var fs = require('fs');
var iconModel = require("../../models/resources/icon.model");
var iconCollectionModel = require("../../models/resources/iconCollection.model");
var archiver = require('archiver');
var co = require('co');

function changeSvgColor(svgstr,color){
    return svgstr.replace('#000','#'+color);
}

module.exports = {
    archiveDownload: function (req, res) {
        co(function*(){
            var typeId = req.query.typeId,
                color = req.query.color;

            //每次初始化archive
            var archive = archiver('zip');

            //监听错误事件
            archive.on('error', function (err) {
                console.log(err);
            });

            //监听打包完成的事件
            archive.on('end', function () {
                console.log('Archive wrote %d bytes', archive.pointer());
            });

            //获取图标集合的名称作为压缩文件的文件名
            var collectionInfo =yield iconCollectionModel.getCollectionByQuery({
                _id: typeId
            });
            collectionInfo = collectionInfo[0].toObject();
            res.attachment(collectionInfo.name + '.zip');

            //将压缩文件的流赋值给res（res是一个writeStream）
            archive.pipe(res);

            //从数据库查询图标集合的图标，遍历进行打包
            var icons = yield iconModel.getIconsByQuery({
                collection_id: typeId
            });
            icons.forEach(function (svg) {
                svg = svg.toObject();
                archive.append(changeSvgColor(svg.svgXML,color), {
                    name: svg.name + '_' + svg._id + '.svg'
                });
            });
            //文件打包结束
            archive.finalize();
        });
    },

    iconDownload:function(req,res){
        co(function*(){
            var color = req.query.color;
            var iconId = req.query.iconId;
            var icon = yield iconModel.getIconsByQuery({
                _id: iconId
            });
            icon = icon[0].toObject();

            var iconBuffer = new Buffer(changeSvgColor(icon.svgXML,color));
            res.attachment(icon.name + '.svg');
            res.send(iconBuffer);

        })
    }
};