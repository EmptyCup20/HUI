/**
 * Created by zhengjunling on 2016/12/5.
 */
define(["markdown"], function (markdown) {
    var DocManage = Backbone.View.extend({
        events: {
            "input #md_field": "preview",
            "click #doc_submit": "submit"
        },
        initialize: function () {
            this.render();
        },

        render: function () {
            var that = this;
            $.get("/admin/getPage/docManage").done(function (data) {
                $(".page").html(data);
                that.setElement("#docManage");
                that.getDoc();
            })
        },

        //获取文档内容并填充文本框
        getDoc: function () {
            var that = this;
            $.ajax({
                url: "/admin/getDesignDocMd",
            }).done(function (data) {
                if (data.success) {
                    $("#md_field").val(data.data.content);
                    that.preview();
                }
            })
        },

        //预览
        preview: function () {
            var md_str = $("#md_field").val();
            $("#preview").html(markdown.toHTML(md_str));
        },

        //保存文档
        submit: function () {
            $.ajax({
                url: "/admin/updateDesignDoc",
                method: "post",
                data: {
                    content: $("#md_field").val()
                }
            }).done(function (data) {
                alert(data.message);
            })
        }
    });
    return DocManage;
});