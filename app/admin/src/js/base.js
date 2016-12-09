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


(function(){
    // 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
})();

