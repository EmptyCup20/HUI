/**
 * Created by zhengjunling on 2016/12/6.
 */
require.config({
    baseUrl: "/plugins/",
    paths: {
        "jquery": "jquery-1.11.3.min",
        "underscore": "underscore-min",
        "backbone": "backbone-min",
        "bootstrap": "bootstrap/js/bootstrap.min",
        "bsTable": "bootstrap-table/bootstrap-table",
        "wizard": "bootstrap-wizard/jquery.bootstrap.wizard",
        "markdown": "markdown-js/markdown",
        "jquery-ui/widget": "fileupload/jquery.ui.widget",
        "iframe-transport": "fileupload/jquery.iframe-transport",
        "fileupload": "fileupload/jquery.fileupload"
    },
    //定义依赖
    shim: {
        "backbone": {
            deps: ["underscore", "jquery"]
        },
        "bootstrap": {
            deps: ["jquery"]
        },
        "bootstrap-table": {
            deps: ["jquery", "bootstrap"]
        },
        "fileupload": {
            deps: ["jquery-ui/widget", "iframe-transport"]
        },
        "bsTable": {
            deps: ["bootstrap"]
        },
        "wizard": {
            deps: ["bootstrap"]
        }
    }
});

require(["jquery", "underscore", "backbone", "bootstrap"], function () {
    window.App = {
        Routers: {
            //主路由
            Main: Backbone.Router.extend({
                routes: {
                    //文档管理
                    "docManage": "docManage",
                    //图标管理
                    "iconManage": "iconCollection",
                    //添加图标库
                    "iconManage/addCollection": "collectionAdd",
                    //编辑图标库
                    "iconManage/editCollection/:id": "collectionEdit",
                    "editIcon/:iconId": "editIcon",
                    "editIcon": "editIcon",
                    //图标类型管理
                    "iconTypeManage": "iconTypeManage",
                    "iconTypeEdit/:typeID": "iconTypeEdit",
                    "iconTypeAdd": "iconTypeAdd",

                    //UIKIT管理
                    "uikit": "uikitManage",
                    "uikit/uikitEdit/:id": "uikitEdit",

                    //作品管理
                    "workPoolManage": "workPoolManage",
                    "workPoolManage_edit(/:id)": "workPoolEdit",

                    //特殊
                    "*action": "docManage"
                },

                docManage: function () {
                    require(["/admin/src/js/docManage.js"], function (module) {
                        new module;
                    });
                },

                iconCollection: function () {
                    require(["/admin/src/js/collectionManage.js"], function (module) {
                        new module;
                    });
                },

                collectionAdd: function () {
                    require(["/admin/src/js/collectionAdd.js"], function (module) {
                        new module();
                    });
                },

                collectionEdit: function (id) {
                    require(["/admin/src/js/collectionEdit.js"], function (module) {
                        new module(id);
                    });
                },

                iconManage: function () {
                    require(["/admin/src/js/iconManage.js"], function (module) {
                        new module;
                    });
                },

                editIcon: function (iconId) {
                    require(["/admin/src/js/editIcon.js"], function (module) {
                        new module(iconId);
                    });
                },

                iconTypeManage: function () {
                    require(["/admin/src/js/iconTypeManage.js"], function (module) {
                        new module;
                    });
                },

                iconTypeEdit: function (typeID) {
                    require(["/admin/src/js/iconTypeEdit.js"], function (module) {
                        new module(typeID);
                    });
                },

                iconTypeAdd: function () {
                    require(["/admin/src/js/iconTypeAdd.js"], function (module) {
                        new module;
                    });
                },

                uikitManage: function () {
                    require(["/admin/src/js/uikitManage.js"], function (module) {
                        new module;
                    });
                },

                uikitEdit: function (id) {
                    require(["/admin/src/js/uikitEdit.js"], function (module) {
                        new module(id);
                    });
                },

                workPoolManage: function () {
                    require(["/admin/src/js/workPoolManage.js", "/admin/src/js/base.js"], function (module) {
                        new module;
                    });
                },

                workPoolEdit: function (id) {
                    require(["/admin/src/js/workPoolEdit.js"], function (module) {
                        new module(id);
                    });
                },
            })
        }
    };
    new App.Routers.Main();
    Backbone.history.start();
})