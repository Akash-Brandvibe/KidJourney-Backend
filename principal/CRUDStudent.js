const Student = require('../models/Student');
const Class = require('../models/Class');
const School = require('../models/School')
const { StatusCodes } = require('http-status-codes');

const getAllStudent = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;

        const student = await Student.find({ principal_id:principalID });
        if(student.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).send(`No active students under principal`);
        }

        res.status(StatusCodes.OK).json(student);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something Went Wrong`);
    }
}
const getStudent = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { id: studentID } = req.params;

        const student = await Student.findOne({ principal_id: principalID, _id: studentID });
        if(!student){
            return res.status(StatusCodes.NOT_FOUND).send(`No student found`);
        }
        res.status(StatusCodes.OK).send(student);
    } catch (error) {
        
    }
}
const createStudent = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const school = await School.findOne({ principal_id: principalID });
        const schoolID = school._id;
        const { first_name, last_name, contact_info, class_id } = req.body;

        if(!first_name || !last_name || !contact_info || !class_id) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide all necessary details`);
        }

        const existingClass = await Class.findOne({ _id: class_id, school_id: schoolID, principal_id: principalID });
        if(!existingClass){
            return res.status(StatusCodes.UNAUTHORIZED).send(`Not authoried to add student to provided class`);
        }

        const details = {
            first_name: first_name,
            last_name: last_name,
            contact_info: contact_info,
            class_id: class_id,
            principal_id: principalID,
        }
        const student = await Student.create({ ...details });
        res.status(StatusCodes.CREATED).json(student);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something Went Wrong`);
    }
}
const updateStudent = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { id: studentID } = req.params;
        const { class_id } = req.body;
        const school = await School.findOne({ principal_id: principalID });
        const schoolID = school._id;

        if(!class_id) {
            return res.status(StatusCodes.NOT_FOUND).send(`Please provide necessary details`);
        }

        const existingClass = await Class.findOne({ _id: class_id, school_id: schoolID, principal_id: principalID });
        if(!existingClass){
            return res.status(StatusCodes.UNAUTHORIZED).send(`Not authoried to add student to provided class`);
        }

        const student = await Student.findOneAndUpdate({ _id: studentID, principal_id: principalID}, {class_id}, {new: true, runValidators: true});
        res.status(StatusCodes.OK).json(student);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something Went Wrong`);
    }
}
const deleteStudent = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { id: studentID } = req.params;

        const student = await Student.findOneAndDelete({ principal_id: principalID, _id: studentID });
        res.status(StatusCodes.OK).json(student);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something Went Wrong`);
    }
}

module.exports = {
    getAllStudent,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}