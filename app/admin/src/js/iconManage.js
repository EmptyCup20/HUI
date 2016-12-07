/**
 * Created by zhengjunling on 2016/12/5.
 */
define(["fileupload"], function () {
    var IconManage = Backbone.View.extend({
        events: {
            "click #iconUpload": "submit"
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var that = this;
            $.get("/admin/getPage/icon_upload").done(function (data) {
                $(".page").html(data);
                that.uploadForm = $("#iconUploadForm");
                $("#icon_upload").fileupload({
                    done: function (t, result) {
                        var data = result.result;
                        alert(data.message);
                        if (!data.data) return;
                        that.uploadForm.find("[name=url]").val(data.data.url);
                        if (!that.uploadForm.find("[name=name]").val()) {
                            that.uploadForm.find("[name=name]").val(data.data.name);
                        }
                    }
                });
            })
        },
        submit: function () {
            var result = this.uploadForm.serialize();
            $.ajax({
                url: "/admin/icon/add",
                method: "post",
                data: result
            }).done(function (data) {
                alert(data.message);
                if (data.success) {
                    window.location.reload();
                }
            })
        }
    });

    return IconManage;
});