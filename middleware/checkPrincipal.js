const cookieParser = require('cookie-parser');
const School = require('../models/School');
const { StatusCodes } = require('http-status-codes');

const checkPrincipal = async (req, res, next) => {
    const { isPrincipal, userID: PrincipalID } = req.cookies.user;

    if (!isPrincipal) {
        return res.status(StatusCodes.UNAUTHORIZED).send(`Not authorized as Principal`);
    }

    const school = await School.findOne({ principal_id: PrincipalID });
    
    if (!school) {
        return res.status(StatusCodes.NOT_FOUND).send(`School not found for the principal`);
    }

    const userData = { ...req.cookies.user };
    userData.schoolID = school._id;

    res.cookie('user', userData, { maxAge: 900000, httpOnly: true });

    next();
}


module.exports = checkPrincipal;
