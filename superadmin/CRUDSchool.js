const School = require('../models/School');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const getSchool = async (req,res) => {
    const { userID: SA_ID } = req.cookies.user;
    const {id: schoolID} = req.params;

    const school = await School.findOne({ super_admin_id: SA_ID, _id: schoolID});

    if(!school){
        return res.status(StatusCodes.NOT_FOUND).send(`School not found`);
    }
    res.status(StatusCodes.OK).json(school);
}

const getAllSchool = async (req,res) => {
    const { userID: SA_ID } = req.cookies.user;

    const school = await School.find({ super_admin_id: SA_ID});

    if(school.length === 0){
        return res.status(StatusCodes.NOT_FOUND).send(`No schools found`);
    }
    res.status(StatusCodes.OK).json(school);
}

const createSchool = async (req, res) => {
    try {
        const { userID: SA_ID } = req.cookies.user;
        const { school_name, branch_name, address, contact_info, principal_id } = req.body;

        if (!school_name || !branch_name || !address || !contact_info || !principal_id) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide all necessary details`);
        }

        const Principal = await User.findOne({ managedBy: SA_ID, _id: principal_id, isPrincipal: true });
        if (!Principal) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Invalid Principal ID`);
        }

        const details = {
            school_name : school_name,
            branch_name : branch_name,
            address : address,
            contact_info : contact_info,
            principal_id: principal_id,
            super_admin_id: SA_ID
        };

        const school = await School.create({ ...details });
        res.status(StatusCodes.CREATED).json(school);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
};

const updateSchool = async (req, res) => {
    try {
        const { id: schoolID } = req.params;
        const { userID: SA_ID } = req.cookies.user;
        const { school_name, branch_name, address, contact_info, principal_id } = req.body;

        let updates = {};

        if (school_name) {
            updates.school_name = school_name;
        }
        if (branch_name) {
            updates.branch_name = branch_name;
        }
        if (address) {
            updates.address = address;
        }
        if (contact_info) {
            updates.contact_info = contact_info;
        }
        if (principal_id) {
            const Principal = await User.findOne({ managedBy: SA_ID, _id: principal_id, isPrincipal: true });
            if (!Principal) {
                return res.status(StatusCodes.BAD_REQUEST).send(`Invalid Principal ID`);
            }
            updates.principal_id = principal_id;
        }

        const school = await School.findOneAndUpdate({ super_admin_id: SA_ID, _id: schoolID }, updates, { new: true, runValidators: true });
        if (!school) {
            return res.status(StatusCodes.NOT_FOUND).send(`School not found`);
        }

        res.status(StatusCodes.ACCEPTED).json(school);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
};


const deleteSchool = async (req,res) => {
    try {
        const { id: schoolID } = req.params;
        const { userID: SA_ID } = req.cookies.user;

        if(!schoolID){
            return res.status(StatusCodes.BAD_REQUEST).send(`No School ID provided`);
        }

        const school = await School.findOneAndDelete({ super_admin_id: SA_ID, _id: schoolID });
        res.status(StatusCodes.ACCEPTED).json(school);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

module.exports = {
    getSchool,
    getAllSchool,
    createSchool,
    updateSchool,
    deleteSchool
}