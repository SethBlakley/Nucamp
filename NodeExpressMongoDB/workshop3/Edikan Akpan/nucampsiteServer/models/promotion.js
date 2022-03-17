const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const Partner = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const Promotion = mongoose.model('promotion', promotionSchema);

module.exports = Promotion;