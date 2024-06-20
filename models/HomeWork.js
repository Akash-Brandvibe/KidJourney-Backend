const mongoose = require('mongoose');

const homeWorkSchema = new mongoose.Schema({
    class_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Class',
        required: [true, `Please provide Class ID`]
    },
    teacher_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, `Please provide Teacher ID`]
    },
    title: {
        type: String,
        required: [true, `Please provide Title`]
    },
    description: {
        type: String,
        required: [true, `Please provide Description`]
    },
    due_date: {
        type: String,
        required: [true, `Please provide Due Date`],
        match: [/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, 'Please provide a valid due date in the format YYYY-MM-DDTHH:MM']
    },
    assigned_date: {
        type: Date,
        required: [true, `Please provide Assigned Date`],
        default: Date.now()
    }
});

module.exports = mongoose.model('Homework', homeWorkSchema);