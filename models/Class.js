const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    class_name: {
        type: String,
        required: [true, `Please provide class name`]
    },
    principal_id: {
        type: mongoose.Types.ObjectId,
        required: [true, `Please provide Principal ID`],
        ref: 'User'
    },
    class_teacher_id: {
        type: mongoose.Types.ObjectId,
        required: [true, `Please provide Teacher ID`],
        ref: 'User'
    },
    school_id: {
        type: mongoose.Types.ObjectId,
        required: [true, `Please provide School ID`],
        ref: 'School'
    }
});

module.exports = mongoose.model('Class', classSchema);