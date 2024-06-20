const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    school_name: {
        type: String,
        required: [true, `Please provide School Name`]
    },
    branch_name: {
        type: String,
        required: [true, `Please provide Branch Name`]
    },
    address: {
        type: String,
        required: [true, `Please provide Address`]
    },
    contact_info: {
        type: String,
        required: [true, `Please provide Contact Info`]
    },
    super_admin_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, `Please provide Super Admin ID`]
    },
    principal_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, `Please provide Principal ID`]
    }
});

module.exports = mongoose.model('School', schoolSchema);