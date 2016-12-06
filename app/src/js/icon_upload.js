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
                    window.location.reload();
                }
            })
        }

        $("#icon_upload").fileupload({
            done: function (t, result) {
                var data = result.result;
                alert(data.message);
                if (!data.data) return;
                uploadForm.find("[name=url]").val(data.data.url);
                if (!uploadForm.find("[name=name]").val()) {
                    uploadForm.find("[name=name]").val(data.data.name);
                }
            }
        });
        $("#iconUpload").on("click", function () {
            submit();
        })
    })
})(jQuery)

