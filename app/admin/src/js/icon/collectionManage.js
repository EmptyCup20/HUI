/**
 * Created by zhengjunling on 2016/12/9.
 */
define(['bsTable'], function () {
    var IconCollection = Backbone.View.extend({
        events: {
            "click #collectionList [data-action=del]": "delCollection",//删除图标库
            "click #collectionList [data-action=edit]": "editCollection"//编辑图标库
        },

        initialize: function () {
            this.render();
        },

        /**
         * 页面初始化
         */
        render: function () {
            var that = this;
            $.get("/admin/iconType/collectionManage").done(function (data) {
                $(".page").html(data);

                //定义视图作用域
                that.setElement("#iconCollection");

                that.table = $("#collectionList");

                //初始化表格
                that.loadTable();
            })
        },

        /**
         * 初始化表格
         */
        loadTable: function () {
            this.table.bootstrapTable({
                url: "/admin/iconType/getIconCollection",
                queryParams: function (params) {
                    return $.extend({}, params, {
                        pageSize: params.limit,
                        pageNo: parseInt(params.offset / params.limit + 1)
                    })
                },
                sidePagination: "server",
                columns: [{
                    field: "name",
                    title: "图标库名称"
                }, {
                    field: "type",
                    title: "图标类型"
                }, {
                    title: "操作",
                    formatter: function (v, rowData) {
                        return "<button class='btn btn-sm btn-icon btn-flat btn-default' type='button' data-action='edit' data-rowid='" + rowData._id + "'>" +
                            "<i class='glyphicon glyphicon-edit'></i>" +
                            "</button>" +
                            "<button class='btn btn-sm btn-icon btn-flat btn-default hidden' type='button' data-action='del' data-rowid='" + rowData._id + "'>" +
                            "<i class='glyphicon glyphicon-remove'></i>" +
                            "</button>";
                    }
                }],
                toolbar: "#collectionToolbar",
                pagination: true
            });
        },

        /**
         * 删除图标库
         */
        delCollection: function (e) {
            var that = this;
            var el = $(e.currentTarget);
            $.ajax({
                url: "/admin/iconType/delIconCollection",
                method: "post",
                data: {
                    id: el.attr("data-rowid")
                }
            }).done(function (data) {
                if (data.success) {
                    alert(data.message);
                    that.table.bootstrapTable('refresh');
                }
            })
        },

        /**
         * 编辑图标库
         * @param e
         */
        editCollection: function (e) {
            var el = $(e.currentTarget);
            var collectionId = el.attr("data-rowid");
            window.location.href = "#iconManage/editCollection/" + collectionId;
        }
    });

    return IconCollection;
});