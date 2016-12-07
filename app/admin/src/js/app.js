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
        "markdown": "markdown-js/markdown",
        "jquery-ui/widget": "fileupload/jquery.ui.widget",
        "iframe-transport": "fileupload/jquery.iframe-transport",
        "fileupload": "fileupload/jquery.fileupload",
    },
    //定义依赖
    shim: {
        "backbone": {
            deps: ["underscore", "jquery"]
        },
        "bootstrap": {
            deps: ["jquery"]
        },
        "fileupload": {
            deps: ["jquery-ui/widget", "iframe-transport"]
        }
    }
});

require(["jquery", "underscore", "backbone", "bootstrap"], function () {
    window.App = {
        Routers: {
            //主路由
            Main: Backbone.Router.extend({
                routes: {
                    "docManage": "docManage",
                    "iconManage": "iconManage",
                    "*action": "docManage"
                },

                docManage: function () {
                    require(["/admin/src/js/docManage.js"], function (module) {
                        new module;
                    });
                },

                iconManage: function () {
                    require(["/admin/src/js/iconManage.js"], function (module) {
                        new module;
                    });
                }
            })
        }
    };
    new App.Routers.Main();
    Backbone.history.start();
})