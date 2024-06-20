const mongoose = require('mongoose');

const weeklyReportSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    teacher_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    week_start_date: {
        type: Date,
        required: true
    },
    week_end_date: {
        type: Date,
        required: true
    },
    subjects: [{
        subject_name: {
            type: String,
            required: true
        },
        grades: [{
            grade: {
                type: String,
                enum: ['A', 'B', 'C', 'D', 'F'],
                required: true
            },
            comments: {
                type: String
            }
        }]
    }],
    overall_comments: {
        type: String
    }
});

module.exports = mongoose.model('WeeklyReport', weeklyReportSchema);
