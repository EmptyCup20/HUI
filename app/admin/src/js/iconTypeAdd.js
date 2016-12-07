/**
 * Created by zhengjunling on 2016/12/5.
 */
define(function () {
    var IconTypeManage = Backbone.View.extend({
        events: {
            "click .btn-submit" : "submit"
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var self = this;
            $.get("/admin/typeAdd").done(function (data) {
                $(".page").html(data);
                self.setElement("#iconTypeEditDiv");
            })
        },
        submit : function() {
            var form = $("#fileForm");
            var result = form.serialize();
            $.ajax({
                url: "/admin/typeEdit",
                method: "post",
                data: result
            }).done(function (data) {
                alert(data.message);
                if (data.success) {
                    window.location = "/admin/#iconTypeManage";
                }
            })
        }
    });

    return IconTypeManage;
});