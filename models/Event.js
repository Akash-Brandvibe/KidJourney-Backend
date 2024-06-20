const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    principal_id : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, `Please provide Principal ID`]
    },
    school_id : {
        type: mongoose.Types.ObjectId,
        ref: 'School',
        required: [true, `Please provide School ID`]
    },
    event_name: {
        type: String,
        required: [true, `Please provide Event Name`]
    },
    event_type: {
        type: String,
        required: [true, `Please provide Event Type`]
    },
    event_date: {
        type: Date,
        required: [true, `Please provide Event Date`],
        validator: function(value) {
                return value > Date.now();
            },
            message: 'Event Date must be in the future'
    },
    description: {
        type: String,
        required: [true, `Please provide Event Description`]
    },
    location: {
        type: String,
        required: [true, `Please provide Event Location`]
    },
    organizer: {
        type: String
    }
});

module.exports = mongoose.model('Event', eventSchema);