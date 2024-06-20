const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    principal_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    first_name: {
        type: String,
        required: [true, `Please provide first name`]
    },
    last_name: {
        type: String,
        required: [true, `Please provide first name`]
    },
    contact_info: {
        type: String,
        required: [true, `Please provide contact info of the student`]
    },
    parent_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    class_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Class',
        required: [true, `Please provide Class ID`]
    }
});

module.exports = mongoose.model('Student', studentSchema);