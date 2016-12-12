/**
 * Created by zhengjunling on 2016/12/11.
 */
/**
 * 自定义获取表单值并转成JSON的方法
 * @author zhengjunling
 * @date   2016-05-14
 */
(function ($) {
    $.fn.serializeJson = function (opts) {
        var that = this;
        var defaults = {
            allowDisabled: true,//是否允许获取设置为disabled的表单元素的值
            allowHidden: true,//是否允许获取隐藏的表单元素的值
            except: []
        };
        var serializeObj = {};
        //通过serializeArray()将表单值存为数组
        var array = that.serializeArray();

        opts = $.extend({}, defaults, opts);
        if (opts.allowDisabled) {
            that.find("input[name]:disabled, textarea[name]:disabled, select[name]:disabled").each(function () {
                array.push({
                    name: $(this).attr("name"),
                    value: $(this).val()
                })
            })
        }
        $(array).each(function () {
            //已经存在相同的name
            if (serializeObj[this.name]) {
                //值是数组，则将当前值插入数组,否则，将已有的值和当前值合并为数组
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        if (!opts.allowHidden) {
            that.find("input[name]:hidden, textarea[name]:hidden, select[name]:hidden").each(function () {
                var name = $(this).attr("name");
                if (that.find("[name=" + name + "]:visible").length) return;
                delete serializeObj[name];
            })
        }
        if (opts.except.length) {
            $.each(opts.except, function () {
                delete serializeObj[this];
            })
        }
        return serializeObj;
    }
})(jQuery);