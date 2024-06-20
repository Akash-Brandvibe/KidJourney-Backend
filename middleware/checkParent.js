const { StatusCodes } = require('http-status-codes');

const checkParent = async (req,res,next) => {
    const { isParent } = req.cookies.user;

    if( !isParent ){
        return res.status(StatusCodes.UNAUTHORIZED).send(`Not authorized as Parent User`);
    }

    next();
}

module.exports = checkParent;