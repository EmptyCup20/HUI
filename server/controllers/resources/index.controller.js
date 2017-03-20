/**
 * Created by xiangxiao3 on 2016/12/16.
 */
module.exports = {
    frontHome: function (req, res) {
        res.render('index.ejs', {
            model: 'index'
        });
    }
}