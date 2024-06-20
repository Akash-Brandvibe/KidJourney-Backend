const { StatusCodes } = require('http-status-codes');
const Message = require('../models/Message');

const getAllMessages = async(req,res) => {
    try {
        const { conversation_id, recipient_id } = req.query;
        let query = {};

        if (conversation_id) {
            query.conversation_id = conversation_id;
        }
        if (recipient_id) {
            query.recipient_id = recipient_id;
        }

        const messages = await Message.find(query);

        if(messages.length === 0){
            return res.status(StatusCodes.NOT_FOUND).send(`No messages found`);
        }

        res.status(StatusCodes.OK).json(messages);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const getMessage = async(req,res) => {
    try {
        const { id: messageID } = req.params;
        const { conversation_id, recipient_id } = req.query;
        let query = { _id: messageID };

        if (conversation_id) {
            query.conversation_id = conversation_id;
        }
        if (recipient_id) {
            query.recipient_id = recipient_id;
        }

        const message = await Message.findOne(query);

        if(!message){
            return res.status(StatusCodes.NOT_FOUND).send(`No message found`);
        }
        res.status(StatusCodes.OK).json(message);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const createMessage = async(req,res) => {
    try {
        const { conversation_id, recipient_id } = req.query;
        const { userID: senderID } = req.cookies.user;
        const { content, attachments } = req.body;

        if(!content) {
            return res.status(StatusCodes.BAD_REQUEST).send(`No message found`);
        }

        const messageEntry = await Message.create({
            sender_id: senderID,
            recipient_id: recipient_id,
            conversation_id: conversation_id,
            content: content,
            attachments: attachments
        });
        res.status(StatusCodes.CREATED).json(messageEntry);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const updateMessage = async(req,res) => {
    try {
        const { content } = req.body;
        const { id: messageID } = req.params;
        const { conversation_id, recipient_id } = req.query;
        
        let query = { _id: messageID };
        if (conversation_id) {
            query.conversation_id = conversation_id;
        }
        if (recipient_id) {
            query.recipient_id = recipient_id;
        }

        let updates = {};
        if(content){
            updates.content = content
        }

        if(Object.keys(updates).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).send(`No updates provided`);
        }

        const messageEntry = await Message.findOneAndUpdate(
            query, updates, { new: true, runValidators: true}
        )
        res.status(StatusCodes.OK).json(messageEntry);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const deleteMessage = async(req,res) => {
    try {
        const { id: messageID } = req.params;
        const { conversation_id, recipient_id } = req.query;
        let query = { _id: messageID };

        if (conversation_id) {
            query.conversation_id = conversation_id;
        }
        if (recipient_id) {
            query.recipient_id = recipient_id;
        }

        const messageEntry = await Message.findOneAndDelete(query);
        res.status(StatusCodes.OK).json(messageEntry);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

module.exports = {
    getAllMessages,
    getMessage,
    createMessage,
    updateMessage,
    deleteMessage
}