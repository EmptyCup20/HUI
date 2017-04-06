/**
 * Created by zhengjunling on 2017/3/22.
 */
var moment = require("moment");
moment.locale("zh-CN");
module.exports = {
    resParse: function (success, message, data) {
        return {
            success: success,
            message: message || "",
            data: data || null
        }
    },

    formatShowDate: function (date) {
        return moment(date).fromNow();
    }
};