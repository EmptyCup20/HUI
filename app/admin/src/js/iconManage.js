/**
 * Created by zhengjunling on 2016/12/5.
 */
define(function () {
    var IconManage = Backbone.View.extend({
        events: {
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var that = this;
            $.get("/admin/resource/all").done(function (data) {
                $(".page").html(data);
            })
        },
    });

    return IconManage;
});