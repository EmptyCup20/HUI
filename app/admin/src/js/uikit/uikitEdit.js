/**
 * Created by zhengjunling on 2016/12/9.
 */
define(["/admin/src/js/util.js", "fileupload"], function () {
    var UIKITEdit = Backbone.View.extend({
        events: {
            "click [data-action=addContent]": "addContent",
            "click [data-action=close]": "removeContent"
        },

        initialize: function (id) {
            this.id = id;
            this.render(id);
        },

        render: function (id) {
            var that = this;
            $.get("/admin/uikit/uikitEdit/" + id).done(function (data) {
                $(".page").html(data);

                //定义视图作用域
                that.setElement("#uikitEdit");

                that.getContent().initFileupload();

                $("#addUikitContentModal").on("hidden.bs.modal", function () {
                    that.render(that.id);
                })
            })
        },

        /**
         * 根据id获取内容信息
         * @returns {UIKITEdit}
         */
        getContent: function () {
            var that = this;
            $.ajax({
                url: "/admin/uikit/getContentById",
                data: {
                    id: this.id
                },
                method: "post"
            }).done(function (data) {
                if (data.success) {
                    that.content = data.data[0].content;
                }
            });
            return this;
        },

        /**
         * 初始化上传控件
         */
        initFileupload: function () {
            var that = this;
            $("[name=img]", this.$el).fileupload({
                url: "/admin/upload/imgUpload",
                formData : {
                    name : "img",
                    type : "png,jpg"
                },
                done: function (t, result) {
                    var data = result.result;
                    if (data.success) {
                        $("[name=imgUrl]", that.$el).val(data.data.url);
                    } else {
                        alert(data.message);
                    }
                }
            });
            $("[name=attachment]", this.$el).fileupload({
                url: "/admin/upload/imgUpload",
                formData : {
                    name : "attachment",
                    type : "psd"
                },
                done: function (t, result) {
                    var data = result.result;
                    if (data.success) {
                        $("[name=attachmentUrl]", that.$el).val(data.data.url);
                    } else {
                        alert(data.message);
                    }
                }
            });

            return this;
        },

        /**
         * 弹框点击确定添加内容
         */
        addContent: function () {
            var newContent = $("#addUikitContentForm").serializeJson();
            $.ajax({
                url: "/admin/uikit/addContent",
                data: {
                    id: this.id,
                    content: JSON.stringify(newContent)
                },
                method: "post"
            }).done(function (data) {
                if (data.success) {
                    alert(data.message);
                    $("#addUikitContentModal").modal('hide');
                }
            })
        },

        removeContent: function (e) {
            var el = $(e.currentTarget);
            var contentId = el.parents(".panel").attr("data-id");
            $.ajax({
                url: "/admin/uikit/removeContent",
                data: {
                    id: this.id,
                    contentId: contentId
                }, method: "post"
            }).done(function (data) {
                if (data.success) {
                    alert(data.message);
                    el.parents(".panel").remove();
                }
            })
        }
    });

    return UIKITEdit;
});