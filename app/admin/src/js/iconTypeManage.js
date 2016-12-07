/**
 * Created by zhengjunling on 2016/12/5.
 */
define(function () {
    var IconTypeManage = Backbone.View.extend({
        events: {
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var that = this;
            $.get("/admin/typeList").done(function (data) {
                $(".page").html(data);
            })
        },
    });

    return IconTypeManage;
});