/**
 * Created by zhengjunling on 2016/12/5.
 */
define(["markdown", "fileupload"], function (markdown) {
    var DocManage = Backbone.View.extend({
        events: {
            //md全屏编辑控制
            "click .md-control-fullscreen": "editorFullscreen",
            //实时预览
            "input #mdEditor .md-input": "preview",
            //记录textarea失去焦点前的光标位置
            "blur #mdEditor .md-input": "getCursorPosition",
            //提交更改
            "click #doc_submit": "submit"
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

                //定义视图作用域
                that.setElement("#docManage");

                that.editor = $("#mdEditor", that.$el);
                that.textField = that.editor.find(".md-input");

                //初始化编辑内容
                that.initEditorContent();

                that.initFileupload();
            })
        },

        /**
         * 获取文档内容并填充文本框
         */
        initEditorContent: function () {
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
         * 初始化图片上传控件
         */
        initFileupload: function () {
            $("#docImgUpload").fileupload({
                url: "/admin/imgUpload",
                paramName: "img",//重要，代替控件name属性
                formData: {
                    unique: false //允许多次上传同一张图片
                },
                done: function (t, result) {
                    var data = result.result;
                    if (data.success) {
                        that.insertImgAtCaret(data.data.url);
                        that.preview();
                    }
                }
            });
        },

        /**
         * 文档实时预览
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
         * 文档编辑器全屏控制
         */
        editorFullscreen: function () {
            $("body").toggleClass("md-nooverflow");
            this.editor.toggleClass("md-fullscreen-mode");
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