const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: [true, 'Please provide Class ID']
    },
    day_of_the_week: {
        type: String,
        required: [true, 'Please provide Day of the week']
    },
    start_time: {
        type: String,
        required: [true, 'Please provide start time']
    },
    end_time: {
        type: String,
        required: [true, 'Please provide end time']
    },
    subject: {
        type: String,
        required: [true, 'Please provide subject']
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide teacher ID']
    },
    principal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide principal ID']
    }
});

module.exports = mongoose.model('Timetable', timetableSchema);
