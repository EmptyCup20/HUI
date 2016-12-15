/**
 * Created by zhengjunling on 2016/12/9.
 */
define(["fileupload", "/admin/src/js/util.js"], function () {
    var EditCollection = Backbone.View.extend({
        events: {
            "click .icon-del": "iconDel"//删除图标
        },

        initialize: function (id) {
            var that = this;
            $.get("/admin/iconType/collectionEdit/" + id).done(function (data) {
                $(".page").html(data);
                //定义视图作用域
                that.setElement("#collectionEdit");

                that.collectionId = id;

                that.form = $("#collectionEditForm", that.$el);

                that.initFileupload();

            });
        },

        /**
         * 上传控件初始化
         */
        initFileupload: function () {
            var that = this;
            //psd附件上传
            $("#attachmentUpload").fileupload({
                url: "/admin/upload/imgUpload",
                formData : {
                    name : "attachmentUpload",
                    type : "png,jpg"
                },
                done: function (t, result) {
                    var data = result.result;
                    if (data.success) {
                        $("[name=attachmentUrl]", that.form).val(data.data.url);
                    } else {
                        alert(data.message);
                    }
                }
            });

            //图标上传
            $("#iconUpload").fileupload({
                url: "/admin/upload/imgUpload",
                formData : {
                    name : "iconFile",
                    type : "png,jpg"
                },
                done: function (t, result) {
                    if (result.result.success) {
                        var data = result.result.data;
                        that.iconAdd(data);
                    }
                    else {
                        alert(result.result.message);
                    }
                }
            });
        },

        /**
         * 上传的图标添加到数据库
         * @param data
         * @returns {EditCollection}
         */
        iconAdd: function (data) {
            var that = this;
            $.ajax({
                url: "/admin/icon/add",
                method: "post",
                data: $.extend({}, data, {
                    type: this.form.find("[name=type]").val(),
                    tags: this.createTags(data),
                    collection_id: this.collectionId
                })
            }).done(function (result) {
                if (result.success) {
                    that.renderIconList(result.data);
                }
            });
            return this;
        },

        createTags: function (data) {
            return data.name.split(/_|-|\./).join(",");
        },

        /**
         * 图标上传后预览
         * @param data
         */
        renderIconList: function (data) {
            $("<div class='col-lg-1 col-md-2 col-sm-4 icon-preview-wrap' data-id='" + data._id + "'>" +
                "<div class='icon-preview'>" +
                "<img src=" + data.url + ">" +
                "<span class='icon-title'>" + data.name + "</span>" +
                "<div class='icon-del'><i class='glyphicon glyphicon-trash'></i></div>" +
                "</div>" +
                "</div>").appendTo("#iconListBox");
        },

        /**
         * 图标删除
         * @param e
         */
        iconDel: function (e) {
            var $this = $(e.currentTarget);
            var parent = $this.parents(".icon-preview-wrap");
            var id = parent.attr("data-id");
            $.ajax({
                url: "/admin/icon/del",
                method: "post",
                data: {
                    id: id
                }
            }).done(function (data) {
                if (data.success) {
                    alert(data.message);
                    parent.remove();
                }
            })
        }
    });

    return EditCollection;

});