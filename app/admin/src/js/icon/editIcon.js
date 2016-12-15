/**
 * Created by zhengjunling on 2016/11/29.
 */

define(["fileupload"],function () {
    var IconUpload = Backbone.View.extend({
        events: {
            "change #fileType": "onbtnFileTypeChange",
            "click #iconUpload" : "submit"
        },
        initialize: function (iconId) {
            iconId = iconId ? "/" + iconId : "";
            this.render(iconId);
        },

        /**
         * 页面初始化
         */
        render: function (iconId) {
            var self = this;
            $.get("/admin/icon/getEditPage" + iconId).done(function (data) {
                $(".page").html(data);
                self.setElement("#IconManage");

                var uploadForm = $("#iconUploadForm");
                $(".psd-space").hide();
                $(".zip-space").hide();

                $("[data-function=file_upload]").fileupload({
                    formData : {
                        name : "iconFile",
                        type : "png,jpg"
                    },
                    done: function (t, result) {
                        var data = result.result;
                        var type = $(this).attr("data-type");
                        if (!data || !data.data) return;
                        if(type === "svg" || type === "png"){
                            uploadForm.find("[name=" + type + "file]").val(data.data.url);
                            uploadForm.find("[id=" + type + "img]").attr("src", data.data.url);
                        }else{
                            uploadForm.find("[id=" + type + "file]").attr("href", data.data.url).html(data.data.url)
                        }
                    }
                });
            });
        },
        /**
         * 改变文件类型后操作
         */
        onbtnFileTypeChange : function(){
            var value = $("#fileType").val();

            //类型部分显示
            $("[name=collection]").val("");
            $("[name=collection] option").hide();
            $("[name=collection] [data-type="+value+"]").show();
            //上传文件部分显示
            $(".svg-space").hide();
            $(".png-space").hide();
            $(".psd-space").hide();
            $(".zip-space").hide();
            switch (value){
                case "0":
                    $(".svg-space").show();
                    $(".png-space").show();
                    break
                case "1":
                    $(".png-space").show();
                    break
                case "2":
                    $(".psd-space").show();
                    break
                case "3":
                    $(".zip-space").show();
                    break
            }
        },
        /**
         * 提交保存
         */
        submit:function() {
            var uploadForm = $("#iconUploadForm");
            var result = uploadForm.serialize();
            $.ajax({
                url: "/admin/icon/add",
                method: "post",
                data: result
            }).done(function (data) {
                alert(data.message);
                if (data.success) {
                    window.location = "/admin/#iconManage";
                }
            })
        }
    })
    return IconUpload;
});

