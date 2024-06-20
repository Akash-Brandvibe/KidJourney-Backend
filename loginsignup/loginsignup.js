const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide email and password`);
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Invalid Credentials`);
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Invalid Credentials`);
        }

        const userData = await user.createCookie(res);

        res.status(StatusCodes.CREATED).json({ userCookie: userData, user: user });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
};


const signup = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Could not create User`);
        }

        const userData = await user.createCookie(res);

        res.status(StatusCodes.CREATED).json({ userCookie: userData, user: user});
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
};

module.exports = {
    login, signup
}