const Class = require('../models/Class');
const School = require('../models/School');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const getClass = async (req,res) => {
    try {
        const { id: classID } = req.params;
        const { userID: principalID } = req.cookies.user;

        const school = await School.findOne({ principal_id: principalID });
        const schoolID = school._id;

        const class_ = await Class.findOne({ principal_id: principalID, school_id: schoolID, _id: classID });

        if(!class_){
            return res.status(StatusCodes.NOT_FOUND).send(`No Class Found with ID: ${classID}`);
        }

        res.status(StatusCodes.OK).json(class_);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const getAllClasses = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;

        const class_ = await Class.find({ principal_id: principalID });

        if(class_.length === 0){
            return res.status(StatusCodes.NOT_FOUND).send(`No Active Classes under Principal`);
        }

        res.status(StatusCodes.OK).json(class_);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const createClass = async (req, res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { class_name, class_teacher_id } = req.body;

        const school = await School.findOne({ principal_id: principalID });

        if (!class_name || !class_teacher_id) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide class name and class teacher ID`);
        }

        const existingTeacher = await User.findOne({ managedBy: principalID, _id: class_teacher_id });
        if (!existingTeacher) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Invalid Class Teacher ID`);
        }

        const details = {
            class_name: class_name,
            principal_id: principalID,
            class_teacher_id: class_teacher_id,
            school_id: school._id
        }

        const class_ = await Class.create({ ...details });
        res.status(StatusCodes.CREATED).json(class_);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}


const updateClass = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { class_name, class_teacher_id } = req.body;
        const { id: classID } = req.params;

        const school = await School.findOne({ principal_id: principalID });
        const schoolID = school._id;

        if(!classID){
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide Class ID`);
        }

        let updates = {};

        if(class_name){
            updates.class_name = class_name;
        }

        if(class_teacher_id){
            const existingTeacher = await User.findOne({ managedBy: principalID, _id: class_teacher_id });
            if(!existingTeacher){
                return res.status(StatusCodes.BAD_REQUEST).send(`Invalid Class Teacher ID`);
            }
            updates.class_teacher_id = class_teacher_id;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).send(`No updates provided`);
        }

        const class_ = await Class.findOneAndUpdate({ principal_id: principalID, school_id: schoolID, _id: classID }, 
            updates, { new: true, runValidators: true });
        res.status(StatusCodes.OK).json(class_);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const deleteClass = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { id: classID } = req.params;
        const school = await School.findOne({ principal_id: principalID });
        const schoolID = school._id;

        const class_ = await Class.findOneAndDelete({ principal_id: principalID, school_id: schoolID, _id: classID });
        if(!class_){
            return res.status(StatusCodes.BAD_REQUEST).send(`Could not find class`);
        }
        res.status(StatusCodes.OK).json(class_);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

module.exports = {
    getAllClasses,
    getClass,
    createClass,
    updateClass,
    deleteClass
}