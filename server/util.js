/**
 * Created by zhengjunling on 2017/3/22.
 */
module.exports = {
    resParse: function (success, message, data) {
        return {
            success: success,
            message: message || "",
            data: data || null
        }
    }
};