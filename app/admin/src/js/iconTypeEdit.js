/**
 * Created by zhengjunling on 2016/12/5.
 */
define(function () {
    var IconTypeManage = Backbone.View.extend({
        events: {
            "click .btn-submit" : "submit"
        },
        initialize: function (typeId) {
            this.render(typeId);
        },
        render: function (typeId) {
            var self = this;
            $.get("/admin/typeEdit/"+typeId).done(function (data) {
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