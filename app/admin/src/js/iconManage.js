/**
 * Created by zhengjunling on 2016/12/5.
 */
define(function (require, exports, module) {
    module.exports = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            $.get("/admin/getPage/icon_upload").done(function (data) {
                $(".page").html(data);
            })
        }
    });
});