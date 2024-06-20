const { StatusCodes } = require('http-status-codes');
const Student = require('../models/Student');

const getAllReq = async (req,res) => {
    try {
        res.send('Get All Req');
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
}

const getReq = async (req,res) => {
    try {
        res.send('Get Req');
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
}

const createReq = async (req,res) => {
    try {
        const { first_name, last_name, contact_info, class_id } = req.body;
        const { userID: parentId } = req.cookies.user;

        if(!first_name || !last_name || !contact_info || !class_id) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide necessary details`);
        }

        const student = await Student.create({
            first_name: first_name,
            last_name: last_name,
            contact_info: contact_info,
            class_id: class_id,
            parent_id: parentId
        });
        res.status(StatusCodes.OK).json(student);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
}

const updateReq = async (req,res) => {
    try {
        res.send('Update Req');
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
}

const deleteReq = async (req,res) => {
    try {
        res.send('Delete Req');
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
}

module.exports = {
    getAllReq,
    getReq,
    createReq,
    updateReq,
    deleteReq
}