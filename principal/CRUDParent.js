const User = require('../models/User');
const Student = require('../models/Student');
const { StatusCodes } = require('http-status-codes');

const getAllParents = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const students = await Student.find({ principal_id: principalID });
        const parentIDs = students.map( student => student.parent_id);
        const parents = await User.find({ _id: { $in: parentIDs } });

        if(parents.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).send(`No Parents Found`);
        }
        res.status(StatusCodes.OK).json(parents);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something Went Wrong`);
    }
}

const getParent = async (req,res) => {
    try {
        const { id: parentID } = req.params;
        const parent = await User.findById(parentID);

        if (!parent) {
            return res.status(StatusCodes.NOT_FOUND).send('Parent Not Found');
        }

        const { userID: principalID } = req.cookies.user;
        const student = await Student.findOne({ parent_id: parentID, principal_id: principalID });

        if (!student) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized Access');
        }

        res.status(200).json(parent);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something Went Wrong`);
    }
}

const updateParent = async (req,res) => {
    try {
        res.send(`Update Parent`);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something Went Wrong`);
    }
}

module.exports = {
    getAllParents,
    getParent,
    updateParent
}