/**
 * Created by zhengjunling on 2016/12/9.
 */
define(['bsTable'], function () {
    var UIKITManage = Backbone.View.extend({
        events: {
            "click [data-action=add]": "addCategory",
            "click [data-action=edit]": "openEditModal",
            "click [data-action=del]": "delCategory",
            "click [data-action=save]": "saveCategory",
            "click [data-action=editContent]": "editContent"
        },

        initialize: function () {
            this.render();
        },

        /**
         * 页面初始化
         */
        render: function () {
            var that = this;
            $.get("/admin/getPage/uikit").done(function (data) {
                $(".page").html(data);

                //定义视图作用域
                that.setElement("#uikitManage");

                that.table = $("#uikitList", that.$el);

                that.addModal = $('#addUikitModal', that.$el);

                that.editModal = $('#editUikitModal', that.$el);

                that.loadTable();


                that.editModal.on("show.bs.modal", function () {
                    that.editModal.find("[name=name]").val(that.editData.name);
                    that.editModal.find("[name=id]").val(that.editData._id);
                })
            })
        },

        /**
         * 初始化表格
         */
        loadTable: function () {
            this.table.bootstrapTable({
                url: "/admin/uikit/getCategory",
                columns: [{
                    field: '_id',
                    visible: false
                }, {
                    field: "name",
                    title: "模块名称",
                    formatter: function (v, rowData) {
                        return "<a data-action='editContent'data-rowid='" + rowData._id + "'>" + v + "</a>"
                    }
                }, {
                    title: "操作",
                    formatter: function (v, rowData) {
                        return "<button class='btn btn-sm btn-icon btn-flat btn-default' type='button' data-action='edit' data-rowid='" + rowData._id + "'>" +
                            "<i class='glyphicon glyphicon-edit'></i>" +
                            "</button>" +
                            "<button class='btn btn-sm btn-icon btn-flat btn-default' type='button' data-action='del' data-rowid='" + rowData._id + "'>" +
                            "<i class='glyphicon glyphicon-remove'></i>" +
                            "</button>";
                    }
                }],
                uniqueId: "_id",
                toolbar: "#uikitToolbar"
            });
        },

        /**
         * 添加目录
         */
        addCategory: function () {
            var that = this;
            var formData = $("#addUikitForm").serialize();
            $.ajax({
                url: "/admin/uikit/addCategory",
                method: "post",
                data: formData
            }).done(function (data) {
                if (data.success) {
                    alert(data.message);
                    that.table.bootstrapTable('refresh');
                    that.addModal.modal('hide');
                }
            })
        },

        /**
         * 打开编辑弹框
         * @param e
         */
        openEditModal: function (e) {
            var rowId = $(e.currentTarget).attr("data-rowid");
            this.editData = this.table.bootstrapTable("getRowByUniqueId", rowId);
            this.editModal.modal("show");
        },

        /**
         * 删除目录
         * @param e
         */
        delCategory: function (e) {
            var that = this;
            var el = $(e.currentTarget);
            $.ajax({
                url: "/admin/uikit/delCategory",
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
         * 保存目录编辑
         */
        saveCategory: function () {
            var that = this;
            var formData = $("#editUikitForm").serialize();
            $.ajax({
                url: "/admin/uikit/editCategory",
                method: "post",
                data: formData
            }).done(function (data) {
                if (data.success) {
                    alert(data.message);
                    that.table.bootstrapTable('refresh');
                    that.editModal.modal('hide');
                }
            })
        },


        /**
         * 编辑内容
         * @param e
         */
        editContent: function (e) {
            var el = $(e.currentTarget);
            var categoryId = el.attr("data-rowid");
            window.location.href = "#uikit/uikitEdit/" + categoryId;
        }
    });

    return UIKITManage;
});