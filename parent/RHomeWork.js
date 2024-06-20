const { StatusCodes } = require('http-status-codes');
const HomeworkSubmission = require('../models/HomeWorkSubmission');

const getHomeWorkSubmission = async( req,res ) => {
    try {
        const { id: studentId } = req.params;
        const { due_date, status } = req.query;

        let query = {
            student_id: studentId
        }
        if(due_date) {
            query.due_date = due_date
        }
        if(status) {
            query.status = status
        }

        const homeWorkSubmission = await HomeworkSubmission.find(query);
        if(homeWorkSubmission.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).send(`No Homeworks found`);
        }
        res.status(StatusCodes.OK).json(homeWorkSubmission);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

module.exports = {
    getHomeWorkSubmission
}