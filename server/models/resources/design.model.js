var db = require('../../../mongo/mongo');

var DesignDoc = new db.Schema({
    type: String,
    content: String,
    update_date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

var DesignModel = db.model("design_doc", DesignDoc);

module.exports = {
    /**
     * 编辑文档
     * @param docObj object
     * @returns {Promise}
     */
    modify: function (data) {
        return new Promise((resolve, reject) => {
            DesignModel.findOneAndUpdate({type: data.type}, {$set: data}, {new: true, upsert: true}, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },

    /**
     * 根据条件获取文档内容
     * @param queryObj
     * @returns {Promise}
     */
    getDocByQuery: function (queryObj) {
        return new Promise((resolve, reject) => {
            DesignModel.findOne(queryObj).exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        });
    }
};