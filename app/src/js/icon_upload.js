/**
 * Created by zhengjunling on 2016/11/29.
 */

define(function () {
    var IconUpload = Backbone.View.extend({
        events: {
        },
        initialize: function () {
            this.render();
        },

        /**
         * 页面初始化
         */
        render: function () {
            $.get("/admin/icon/add").done(function (data) {
                $(".page").html(data);
            });
        }
    })
    return IconUpload;
});
//    (function ($) {
//    $(function () {
//        var uploadForm = $("#iconUploadForm");
//
//        function submit() {
//            var result = uploadForm.serialize();
//            $.ajax({
//                url: "/admin/icon/add",
//                method: "post",
//                data: result
//            }).done(function (data) {
//                alert(data.message);
//                if (data.success) {
//                    window.location.reload();
//                }
//            })
//        }
//
//        $("#icon_upload").fileupload({
//            done: function (t, result) {
//                var data = result.result;
//                alert(data.message);
//                if (!data.data) return;
//                uploadForm.find("[name=url]").val(data.data.url);
//                if (!uploadForm.find("[name=name]").val()) {
//                    uploadForm.find("[name=name]").val(data.data.name);
//                }
//            }
//        });
//        $("#iconUpload").on("click", function () {
//            submit();
//        })
//    })
//})(jQuery)

