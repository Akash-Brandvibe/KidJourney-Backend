const { StatusCodes,  } = require('http-status-codes');
const User = require('../models/User');
const Student = require('../models/Student');
const Class = require('../models/Class');
const CheckInCheckOut = require('../models/CheckinCheckout');

const getAllCICO = async (req,res) => {
    try {
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const getCICO = async (req,res) => {
    try {
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }    
}    

const createCICO = async (req, res) => {
    try {
        const { userID: teacherID } = req.cookies.user;
        const { id: studentID, class_id, checkin_time, checkout_time, date } = req.query;

        const [teacher, student, class_] = await Promise.all([
            User.findOne({ _id: teacherID }).select('managedBy'),
            Student.findOne({ _id: studentID }).select('principal_id class_id'),
            Class.findOne({ _id: class_id, principal_id: teacher.managedBy })
        ]);

        if (!teacher || !student || !class_ || teacher.managedBy !== student.principal_id) {
            return res.status(StatusCodes.UNAUTHORIZED).send(`Not authorized to make the entry for this student`);
        }

        if (student.class_id !== class_._id) {
            return res.status(StatusCodes.UNAUTHORIZED).send(`Student ID and Class IDs mismatch`);
        }

        const CICOEntry = await CheckInCheckOut.create({
            student_id: studentID,
            teacher_id: teacherID,
            class_id: class_id,
            checkin_time: checkin_time,
            checkout_time: checkout_time,
            date: date
        });

        res.status(StatusCodes.CREATED).json(CICOEntry);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const updateCICO = async (req,res) => {
    try {
        //update is required
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const deleteCICO = async (req,res) => {
    try {
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

module.exports = {
    getCICO,
    getAllCICO,
    createCICO,
    updateCICO,
    deleteCICO
}