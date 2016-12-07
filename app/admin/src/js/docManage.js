/**
 * Created by zhengjunling on 2016/12/5.
 */
define(["markdown", "fileupload"], function (markdown) {
    var DocManage = Backbone.View.extend({
        events: {
            "input #md_field": "preview",
            "click #doc_submit": "submit",
            "blur #md_field": "getCursorPosition"
        },
        initialize: function () {
            this.render();
        },

        /**
         * 页面初始化
         */
        render: function () {
            var that = this;
            $.get("/admin/getPage/docManage").done(function (data) {
                $(".page").html(data);
                that.setElement("#docManage");
                that.textField = $("#md_field");

                that.getDoc();

                $("#docImgUpload").fileupload({
                    url: "/admin/imgUpload",
                    paramName: "img",
                    formData: {
                        unique: false
                    },
                    done: function (t, result) {
                        var data = result.result;
                        if (data.success) {
                            that.insertImgAtCaret(data.data.url);
                            that.preview();
                        }
                    }
                });
            })
        },

        /**
         * 获取文档内容并填充文本框
         */
        getDoc: function () {
            var that = this;
            $.ajax({
                url: "/admin/getDesignDocMd",
            }).done(function (data) {
                if (data.success) {
                    that.textField.val(data.data.content);
                    that.preview();
                }
            })
        },

        /**
         * md文档预览
         */
        preview: function () {
            var md_str = this.textField.val();
            $("#preview").html(markdown.toHTML(md_str));
        },

        /**
         * 在光标位置插入图片
         * @param url
         */
        insertImgAtCaret: function (url) {
            var el = this.textField.get(0);
            var imgText = "![](" + url + ")";//md图片插入格式
            if (document.selection) { // IE
                var sel = el.createTextRange();
                var cursorPosition = $(el).data("cursorPosition");
                el.focus();
                sel.moveStart('character', cursorPosition);
                sel.collapse();
                sel.select();
                sel.text = imgText;
                $(el).data("cursorPosition", cursorPosition + imgText.length);
                el.focus();
            } else if (el.selectionStart || el.selectionStart == '0') { // 现代浏览器
                var startPos = el.selectionStart, endPos = el.selectionEnd, scrollTop = el.scrollTop;
                el.value = el.value.substring(0, startPos) + imgText + el.value.substring(endPos, el.value.length);
                el.focus();
                el.selectionStart = startPos + imgText.length;
                el.selectionEnd = startPos + imgText.length;
                el.scrollTop = scrollTop;
            } else {
                el.value += imgText;
                el.focus();
            }
        },

        /**
         * 获取并记录光标位置
         */
        getCursorPosition: function () {
            var el = this.textField.get(0);
            var pos = 0;
            if ('selectionStart' in el) {
                pos = el.selectionStart;
            } else if ('selection' in document) {
                el.focus();
                var r = document.selection.createRange();
                if (r == null) {
                    return 0;
                }
                var re = el.createTextRange(), rc = re.duplicate();
                re.moveToBookmark(r.getBookmark());
                rc.setEndPoint('EndToStart', re);
                return rc.text.length;
            }
            this.textField.data("cursorPosition", pos);
        },

        /**
         * 保存文档
         */
        submit: function () {
            $.ajax({
                url: "/admin/updateDesignDoc",
                method: "post",
                data: {
                    content: this.textField.val()
                }
            }).done(function (data) {
                alert(data.message);
            })
        }
    });
    return DocManage;
});