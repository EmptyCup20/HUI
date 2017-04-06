/**
 * Created by zhengjunling on 2017/4/5.
 */
;(function ($) {
    var urlhash = window.location.pathname.split("/").pop();

    $(function () {
        var commentEditorTemp = '<div class="h-comment-editor clearfix">' +
            '<img class="avatar" src="/src/image/admin_avatar.png">' +
            '<textarea class="comment-textarea" placeholder="说说你的看法"></textarea>' +
            '<button class="btn btn-primary" type="button" data-action="submit">评论</button>' +
            '<button class="btn btn-default" type="button" data-action="cancel">取消</button>' +
            '</div>';

        $(document).on("click", "[data-action=submit]", function () {
            var $parent = $(this).closest(".h-comment-editor");
            var $commentInput = $parent.find("textarea");
            var message = html_encode($commentInput.val());
            var replyTo;
            if (!message) {
                $commentInput.focus();
                return;
            }
            if ($parent.parents(".h-comment-item").length) {
                replyTo = $parent.parents(".h-comment-item").find(".comment-author").text();
            }
            submitReply(message, replyTo);
        });

        $(document).on("click", "[data-action=cancel]", function () {
            $(this).closest(".h-comment-editor").remove();
        });

        $(document).on("click", "[data-action=reply]", function () {
            var $parent = $(this).closest(".h-comment-item");
            var commentid = $(this).data("commentid");
            if ($parent.find(".h-comment-editor").length) {
                $parent.find(".h-comment-editor textarea").focus();
                return;
            }
            $(this).closest(".h-comment-item").append(commentEditorTemp);
        });
    });

    function html_encode(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&/g, "&gt;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    }

    function submitReply(message, replyTo) {
        $.ajax({
            url: "/artical/api/comment/" + urlhash,
            method: "POST",
            data: {
                message: message,
                replyTo: replyTo
            }
        }).done(function (res) {
            if (res.success) {
                window.location.reload();
            } else {
                alert("评论提交失败！请重试");
            }
        })
    }
})(jQuery);
