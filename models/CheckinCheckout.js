const mongoose = require('mongoose');

const checkInCheckOutSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: [true, `Please provide Student ID`]
    },
    teacher_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, `Please provide Teacher ID`]
    },
    class_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Class',
        required: [true, `Please provide Class ID`]
    },
    checkin_time: {
        type: String,
        required: [true, `Please provide Check-in time`],
        validate: {
            validator: function(v) {
                return /\d{2}:\d{2}/.test(v);
            },
            message: props => `${props.value} is not a valid time format. Please use 'HH:MM'.`
        }
    },
    checkout_time: {
        type: String,
        required: [true, `Please provide Check-out time`],
        validate: {
            validator: function(v) {
                return /\d{2}:\d{2}/.test(v);
            },
            message: props => `${props.value} is not a valid time format. Please use 'HH:MM'.`
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CheckInCheckOut', checkInCheckOutSchema);
