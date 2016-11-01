(function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var PoiSchema = new Schema({
        location: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        },
        accuracy: Number,
        name: {
            type: String,
            required: true
        },
        phone_number: String,
        address: String,
        types: [{
            type: String,
            required: true
        }],
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        },
        website: String,
        language: String
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
