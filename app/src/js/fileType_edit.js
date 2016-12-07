/**
 * Created by zhengjunling on 2016/11/29.
 */
(function ($) {
    $(function () {
        var form = $("#fileForm");

        function submit() {
            var result = form.serialize();
            $.ajax({
                url: "/admin/typeEdit",
                method: "post",
                data: result
            }).done(function (data) {
                alert(data.message);
                if (data.success) {
                    window.location.reload();
                }
            })
        }
        $("#fileSubmit").on("click", function () {
            submit();
        })
    })
})(jQuery)

