const { StatusCodes } = require('http-status-codes');

const checkTeacher = async (req,res,next) => {
    const { isTeacher } = req.cookies.user;

    if( !isTeacher ){
        return res.status(StatusCodes.UNAUTHORIZED).send(`Not authorized as Teacher User`);
    }

    next();
}

module.exports = checkTeacher;