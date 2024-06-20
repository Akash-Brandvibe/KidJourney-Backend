const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const getAllTeachers = async (req, res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const Teacher = await User.find({ managedBy: principalID, isTeacher: true });
        
        if (Teacher.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).send(`No Active Teachers under Principal`);
        }
        
        res.status(StatusCodes.OK).json(Teacher);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const getTeacher = async (req,res) => {
    try {
        const { id: TeacherID } = req.params;
        const { userID: principalID } = req.cookies.user;

        const Teacher = await User.findOne({ managedBy: principalID, _id: TeacherID});

        if (!Teacher) {
            return res.status(StatusCodes.NOT_FOUND).send(`Teacher not found`);
        }
        
        res.status(StatusCodes.OK).json(Teacher);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const createTeacher = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { email, password, contact_info } = req.body;
        
        if( !email || !password || !contact_info ){
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide email, password and contact info`);
        }

        const teacher = {
            email: email,
            password: password,
            contact_info: contact_info,
            isTeacher: true,
            managedBy: principalID
        }
        const Teacher = await User.create({ ...teacher });
        res.status(StatusCodes.CREATED).json(Teacher);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const updateTeacher = async (req, res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { email, password, contact_info } = req.body;
        const { id: teacherID } = req.params;

        const existingTeacher = await User.findOne({ _id: teacherID, managedBy: principalID });
        if (!existingTeacher) {
            return res.status(StatusCodes.NOT_FOUND).send(`Teacher not found or not managed by the Principal`);
        }

        let updates = {};
        
        if(email){
            updates.email = email;
        }
        if(password){
            updates.password = password;
        }
        if(contact_info){
            updates.contact_info = contact_info;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).send(`No updates provided`);
        }

        const updatedTeacher = await User.findOneAndUpdate(
            { _id: teacherID, managedBy: principalID },
            updates,
            { new: true, runValidators: true }
        );
        
        res.status(StatusCodes.OK).json(updatedTeacher);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}


module.exports = {
    getAllTeachers,
    getTeacher,
    createTeacher,
    updateTeacher
};
