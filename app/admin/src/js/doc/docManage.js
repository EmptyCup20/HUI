/**
 *
 * @Author zhangxin14
 * @Date   2016/12/9
 *
 */
/**
 * Created by zhengjunling on 2016/12/5.
 */
define(["bsTable"], function (markdown) {
    var DocManage = Backbone.View.extend({
        events: {
            "click [data-action=del]": "delDoc",
        },
        initialize: function () {
            this.render();
        },

        /**
         * 页面初始化
         */
        render: function () {

            var that = this;
            $.get("/admin/doc/docManage").done(function (data) {
                $(".page").html(data);
                that.setElement("#workList");
                that.initTable();

            })
        },

        /**
         * 初始化表格
         */
        initTable: function () {
            $('#workTable').bootstrapTable({
                url: '/admin/doc/getDocList',
                queryParams: function (params) {
                    return $.extend(params, {
                        pageSize: 15,
                        pageNumber: 1
                    })
                },
                responseHandler:function(res){
                    return res.rows
                },
                pageNumber: 1,
                pageSize: 13,
                pagination: true,
                columns: [{
                    field: 'title',
                    title: '文章标题',
                    formatter:function(value){
                        return '<a href="javascript:void(0);">'+value+'</a>'
                    },
                    events: {
                        "click a": function(event,value,row){
                            window.location.href = '#docManageEdit/'+ row._id;
                        }
                    }
                }, {
                    field: 'create_at',
                    title: '创建时间',
                    formatter: function(value,row,index){
                        return '<span>' + new Date(value).Format("yyyy-MM-dd hh:mm:ss") + '</span>'
                    }
                }, {
                    title: "操作",
                    formatter: function (v, rowData) {
                        return "<button class='btn btn-sm btn-icon btn-flat btn-default' type='button' data-action='del' data-rowid='" + rowData._id + "'>" +
                            "<i class='glyphicon glyphicon-remove'></i>" +
                            "</button>";
                    }
                }]
            });
        },
        delDoc : function(e){
            var that = this;
            var el = $(e.currentTarget);
            $.ajax({
                url: "/admin/doc/delDoc",
                method: "post",
                data: {
                    id: el.attr("data-rowid")
                }
            }).done(function (data) {
                if (data.success) {
                    alert("删除成功");
                    el.parents("tr").remove()
                }
            })
        }
    });
    return DocManage;
});