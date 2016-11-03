(function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var PoiSchema = new Schema({
        location: {
            type: [Number],
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phone_number: String,
        address: String,
        type: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        },
        website: String
    });

    PoiSchema.pre('save', function (next) {
        now = new Date();
        this.updated_at = now;
        if (!this.created_at) {
            this.created_at = now
        }
        next();
    });

    PoiSchema.index({location: '2dsphere'});
    module.exports = mongoose.model('locations', PoiSchema);

})();
