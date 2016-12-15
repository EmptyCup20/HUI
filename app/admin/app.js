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
                    //图标管理
                    "iconManage": "iconCollection",
                    //添加图标库
                    "iconManage/addCollection": "collectionAdd",
                    //编辑图标库
                    "iconManage/editCollection/:id": "collectionEdit",
                    "editIcon/:iconId": "editIcon",
                    "editIcon": "editIcon",

                    //UIKIT管理
                    "uikit": "uikitManage",
                    "uikit/uikitEdit/:id": "uikitEdit",

                    //作品池管理
                    "docManage": "docManage",
                    "docManageEdit(/:id)": "docManageEdit",

                    //特殊
                    "*action": "docManage"
                },

                iconCollection: function () {
                    require(["/admin/src/js/icon/collectionManage.js"], function (module) {
                        new module;
                    });
                },

                collectionAdd: function () {
                    require(["/admin/src/js/icon/collectionAdd.js"], function (module) {
                        new module();
                    });
                },

                collectionEdit: function (id) {
                    require(["/admin/src/js/icon/collectionEdit.js"], function (module) {
                        new module(id);
                    });
                },

                iconManage: function () {
                    require(["/admin/src/js/icon/iconManage.js"], function (module) {
                        new module;
                    });
                },

                editIcon: function (iconId) {
                    require(["/admin/src/js/icon/editIcon.js"], function (module) {
                        new module(iconId);
                    });
                },

                uikitManage: function () {
                    require(["/admin/src/js/uikit/uikitManage.js"], function (module) {
                        new module;
                    });
                },

                uikitEdit: function (id) {
                    require(["/admin/src/js/uikit/uikitEdit.js"], function (module) {
                        new module(id);
                    });
                },

                docManage: function () {
                    require(["/admin/src/js/doc/docManage.js", "/admin/src/js/base.js"], function (module) {
                        new module;
                    });
                },

                docManageEdit: function (id) {
                    require(["/admin/src/js/doc/docManageEdit.js"], function (module) {
                        new module(id);
                    });
                },
            })
        }
    };
    new App.Routers.Main();
    Backbone.history.start();
})