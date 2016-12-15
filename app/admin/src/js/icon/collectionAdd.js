/**
 * Created by zhengjunling on 2016/12/9.
 */
define(["fileupload", "wizard", "/admin/src/js/util.js"], function () {
    var AddCollection = Backbone.View.extend({
        events: {
            //表单提交
            "click [data-action=submit]": "submit",
            //删除图标
            "click .icon-del": "iconDel"
        },

        initialize: function () {
            var that = this;
            $.get("/admin/iconType/collectionAdd").done(function (data) {
                $(".page").html(data);
                //定义视图作用域
                that.setElement("#collectionAdd");

                that.form = $("#collectionForm");

                //引导插件初始化
                $("#collectionAddWizard").bootstrapWizard({
                    onTabClick: function () {
                        return false;
                    }
                });

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
                    type : "psd,zip"
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
                        that.renderIconList(data);
                    }
                    else {
                        alert(result.result.message);
                    }
                }
            });
        },

        /**
         * 图标上传后预览
         * @param data
         */
        renderIconList: function (data) {
            $("<div class='col-lg-1 col-md-2 col-sm-4 icon-preview-wrap'>" +
                "<div class='icon-preview'>" +
                "<img src=" + data.url + ">" +
                "<span class='icon-title'>" + data.name + "</span>" +
                "<div class='icon-del'><i class='glyphicon glyphicon-trash'></i></div>" +
                "</div>" +
                "</div>").data("iconData", data).appendTo("#iconListBox");
        },

        /**
         * 图标删除
         * @param e
         */
        iconDel: function (e) {
            var $this = $(e.currentTarget);
            $this.parents(".icon-preview-wrap").remove();
        },

        /**
         * 获取图标数据
         * @returns {Array}
         */
        getIconDatas: function () {
            var that = this;
            var icons = [];
            $("#iconListBox", this.$el).find(".icon-preview-wrap").each(function () {
                var iconData = $(this).data("iconData");
                iconData.type = that.form.find("[name=type]").val();
                iconData.tags = iconData.name.split(/_|-|\./).join(",");
                icons.push(iconData);
            });
            return icons;
        },

        /**
         * 提交表单
         */
        submit: function () {
            var formData = this.form.serializeJson();
            formData.icons = this.getIconDatas();
            $.ajax({
                url: "/admin/iconType/addIconCollection",
                method: "post",
                data: {
                    collection: JSON.stringify(formData)
                }
            }).done(function (data) {
                alert(data.message);
                if (data.success) {
                    window.location.href = "#iconManage";
                }
            })
        }
    });

    return AddCollection;

});