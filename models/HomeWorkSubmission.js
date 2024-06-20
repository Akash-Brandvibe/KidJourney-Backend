const mongoose = require('mongoose');

const homeWorkSubmissionSchema = new mongoose.Schema({
    homework_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Homework',
        required: [true, 'Please provide homework ID']
    },
    student_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Homework',
        required: [true, 'Please provide homework ID']
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
        required: [true, 'Please provide Due Date'],
        match: [/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, 'Please provide a valid due date in the format YYYY-MM-DDTHH:MM']
    },
    status: {
        type: String,
        enum: ['pending', 'submitted', 'graded'],
        default: 'pending'
    }
})

module.exports = mongoose.model('HomeworkSubmission', homeWorkSubmissionSchema);