const cookieParser = require('cookie-parser');
const { StatusCodes } = require('http-status-codes');

const checkSA = async (req, res, next) => {
    const { isAdmin } = req.cookies.user;

    if (!isAdmin) {
        return res.status(StatusCodes.UNAUTHORIZED).send(`Not authorized as Super Admin`);
    }

    next();
}

module.exports = checkSA;
