/**
 * Created by zhengjunling on 2016/12/5.
 */
(function (factory) {
    //模块化
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else factory(jQuery);

})(function ($) {
    //对bootstrap模态框进行封装，方便动态调用
    var BootstrapModel = function (el, options) {
        this.el = $(el);
        this.opts = $.extend({}, BootstrapModel.DEFAULT_OPTIONS, options);
        this.init();
    };

    BootstrapModel.DEFAULT_OPTIONS = $.extend({}, $.fn.modal.Constructor.DEFAULTS, {
    });

    BootstrapModel.template = {
        //外层容器
        container: '<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">' +
        '               <div class="modal-dialog">' +
        '                   <div class="modal-content"></div>' +
        '               </div>' +
        '           </div>',

        //内容区域
        body: '<div class="modal-body"></div>',

        //头部区域
        header: '<div class="modal-header">' +
        '           <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
        '           <h4 class="modal-title">添加目录</h4>' +
        '       </div>',

        //底部区域
        footer: '<div class="modal-footer">' +
        '           <button type="button" class="btn btn-default" data-dismiss="modal">确定</button>' +
        '           <button type="button" class="btn btn-primary" data-action="submit">添加</button>' +
        '        </div>'
    };

    BootstrapModel.prototype = {
        init: function () {

        }
    };


    $.fn.bootstrapmodel = function (option) {
        var params = arguments;
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bootstrapmodel'),
                options = 'object' === typeof option && option;
            if (!data) {
                data = new BootstrapModel(this, options);
                $this.data('bootstrapmodel', data);
            }
            if ('string' === typeof option) {
                data[option].apply(data, Array.prototype.slice.call(params, 1));
            }
        });
    };
});