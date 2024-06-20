const express = require('express');
const router = express.Router();

const {
    getAllMessages,
    getMessage,
    createMessage,
    updateMessage,
    deleteMessage
} = require('../messaging/CRUDMessages');

router.route('/').post(createMessage).get(getAllMessages);
router.route('/:id').get(getMessage).patch(updateMessage).delete(deleteMessage);

module.exports = router;