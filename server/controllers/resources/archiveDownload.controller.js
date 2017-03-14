/**
 * Created by zhangxin14 on 2017/3/13.
 */
var fs = require('fs');
var archiver = require('archiver');
var path = require('path');

var output = fs.createWriteStream(path.join(__dirname, 'svgs.zip'));
var archive = archiver('zip', {
    zlib: {
        level: 9
    }
});

output.on('close', function() {
    console.log(archive.pointer() + 'total bytes');
});

archive.on('error', function(err) {
    throw err;
});


archive.pipe(output);

fs.readFile('downlod.json', 'utf-8', function(err, doc) {
    doc = JSON.parse(doc);
    doc.forEach(function(svg, i) {
        archive.append(svg.show_svg, {
            name: svg.name + '_'+ svg.id + '.svg'
        });
    });
    archive.finalize();
});