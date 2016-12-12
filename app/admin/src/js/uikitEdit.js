/**
 * Created by zhengjunling on 2016/12/9.
 */
define(["/admin/src/js/util.js", "fileupload"], function () {
    var UIKITEdit = Backbone.View.extend({
        events: {
            "click [data-action=addContent]": "addContent"
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
                url: "/admin/imgUpload",
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
                url: "/admin/attachmentUpload",
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
            var that = this;
            var formData;
            var newContent = $("#addUikitContentForm").serializeJson();
            this.content.push(newContent);
            formData = JSON.stringify({
                id: this.id,
                content: newContent
            })
            $.ajax({
                url: "/admin/uikit/addContent",
                data: {
                    formData: formData
                },
                method: "post"
            }).done(function (data) {
                if (data.success) {
                    alert(data.message);
                    $("#addUikitContentModal").modal('hide');
                }
            })
        }
    });

    return UIKITEdit;
});