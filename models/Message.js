const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversation_id: {
        type: String,
        required: [true, `Please provide conversation ID`]
    },
    sender_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, `Please provide sender ID`]
    },
    recipient_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, `Please provide recipient ID`]
    },
    content: {
        type: String,
        required: [true, `Please provide message content`]
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent'
    },
    attachments: {
        type: [String],
        default: []
    }
}, { timestamps: true } );

module.exports = mongoose.model('Message', messageSchema);