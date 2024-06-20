const { StatusCodes } = require('http-status-codes');
const CheckinCheckout = require('../models/CheckinCheckout');
const Student = require('../models/Student');

const getCICO = async (req, res) => {
    try {
        const { userID: parentId } = req.cookies.user;
        const { id: studentId } = req.params;

        const student = await Student.findOne({ _id: studentId, parent_id: parentId });

        if (!student) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Not authorized for this Student Id');
        }

        const cico = await CheckinCheckout.find({ student_id: studentId }).sort({ date: 1 });

        res.status(StatusCodes.OK).json(cico);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
};

module.exports = {
    getCICO
};
