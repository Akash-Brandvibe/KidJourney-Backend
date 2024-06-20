const mongoose = require('mongoose');

const pickupInformation = new mongoose.Schema({
    student_id: {
        required: [true, `Please provide Student ID`],
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    },
    name: {
        required: [true, `Please provide Name`],
        type: String
    },
    vehicle_details: {
        required: [true, `Please provide Vehicle Details`],
        type: String
    },
    contact_info: {
        required: [true, `Please provide Contact Info`],
        type: String
    },
    relation: {
        required: [true, `Please provide Relation`],
        type: String
    }
});

module.exports = mongoose.model('PickupInformation', pickupInformation);