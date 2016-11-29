/**
 * Created by zhengjunling on 2016/11/29.
 */
(function ($) {
    $(function () {
        var uploadForm = $("#iconUploadForm");

        function submit() {
            var result = uploadForm.serialize();
            $.ajax({
                url: "/admin/icon/add",
                method: "post",
                data: result
            }).done(function (data) {
                alert(data.message);
                if (data.success) {
                    window.location.href = "/resource";
                }
            })
        }

        $("#icon_upload").fileupload({
            done: function (t, result) {
                if (!result.result) return;
                uploadForm.find("[name=url]").val(result.result.url);
                if (!uploadForm.find("[name=name]").val()) {
                    uploadForm.find("[name=name]").val(result.result.name);
                }
            }
        });
        $("#iconUpload").on("click", function () {
            submit();
        })
    })
})(jQuery)

