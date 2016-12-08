/**
 * Created by zhengjunling on 2016/12/5.
 */
define(function () {
    var IconTypeManage = Backbone.View.extend({
        events: {
            "change #typeSelect" : "typeSelect",
            "click .danger" : "del"
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var self = this;
            $.get("/admin/typeList").done(function (data) {
                $(".page").html(data);
                self.setElement("#iconTypeManageDiv");
            })
        },
        typeSelect : function(){
            var value = $("#typeSelect").val();
            if(value == "all"){
                $("#typeArea div").show();
            }else{
                $("#typeArea div").hide();
                $("[data-type= "+value+"]").parent().show();
            }
        },
        del : function(e){
            var btn = $(e.target);
            var iconTypeId = btn.attr("data-id");
            $.ajax({
                url: "/admin/typeDel",
                method: "post",
                data: {
                    iconTypeId : iconTypeId
                }
            }).done(function (data) {
                alert(data.message);
                if (data.success) {
                    btn.parents(".icon-box").remove()
                }
            })
        }
    });

    return IconTypeManage;
});