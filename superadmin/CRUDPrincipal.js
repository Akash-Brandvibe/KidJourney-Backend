const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const getAllPrincipal = async (req, res) => {
    try {
        const { userID: SA_ID } = req.cookies.user;
        const Principal = await User.find({ managedBy: SA_ID, isPrincipal: true });
        
        if (Principal.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).send(`No Active Principals under Super Admin`);
        }
        
        res.status(StatusCodes.OK).json(Principal);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const getPrincipal = async (req,res) => {
    try {
        const { id: PrincipalID } = req.params;
        const { userID: SA_ID } = req.cookies.user;

        const Principal = await User.findOne({ managedBy: SA_ID, _id: PrincipalID});

        if (!Principal) {
            return res.status(StatusCodes.NOT_FOUND).send(`Principal not found`);
        }
        
        res.status(StatusCodes.OK).json(Principal);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const createPrincipal = async (req,res) => {
    try {
        const { userID: SA_ID } = req.cookies.user;
        const { email, password, contact_info } = req.body;
        
        if( !email || !password || !contact_info ){
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide email, password and contact info`);
        }

        const principal = {
            email: email,
            password: password,
            contact_info: contact_info,
            isPrincipal: true,
            managedBy: SA_ID
        }
        const Principal = await User.create({ ...principal });
        res.status(StatusCodes.CREATED).json(Principal);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const updatePrincipal = async (req, res) => {
    try {
        const { userID: SA_ID } = req.cookies.user;
        const { email, password, contact_info } = req.body;
        const { id: PrincipalID } = req.params;

        const existingPrincipal = await User.findOne({ _id: PrincipalID, managedBy: SA_ID });
        if (!existingPrincipal) {
            return res.status(StatusCodes.NOT_FOUND).send(`Principal not found or not managed by the super admin`);
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

        const updatedPrincipal = await User.findOneAndUpdate(
            { _id: PrincipalID, managedBy: SA_ID },
            updates,
            { new: true, runValidators: true }
        );
        
        res.status(StatusCodes.OK).json(updatedPrincipal);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}


module.exports = {
    getAllPrincipal,
    getPrincipal,
    createPrincipal,
    updatePrincipal
};
