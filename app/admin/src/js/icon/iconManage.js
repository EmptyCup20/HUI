/**
 * Created by zhengjunling on 2016/12/5.
 */
define(function () {
    var IconManage = Backbone.View.extend({
        events: {
            "click .btn-danger" : "delIcons"
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var self = this;
            $.get("/admin/icon/all").done(function (data) {
                $(".page").html(data);
                self.setElement("#resourceAllDiv");
            })
        },
        delIcons : function(e){
            var btn = $(e.target);
            var iconId = btn.attr("data-id");
            $.ajax({
                url: "/admin/icon/del",
                method: "post",
                data: {
                    iconId : iconId
                }
            }).done(function (data) {
                alert(data.message);
                if (data.success) {
                    btn.parents(".icon-box").remove()
                }
            })
        }
    });

    return IconManage;
});