const { StatusCodes } = require('http-status-codes');
const WeeklyReport = require('../models/WeeklyReport');

const getWeeklyReport = async(req,res) => {
    try {
        const { id: studentId } = req.params;
        const { week_start_date, week_end_date } = req.query;

        let query = {
            student_id: studentId
        }
        if(week_start_date){
            query.week_start_date = week_start_date
        }
        if(week_end_date){
            query.week_end_date = week_end_date
        }
        
        const weeklyReport = await WeeklyReport.find(query);
        if(weeklyReport.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).send(`No weekly Reports found`);
        }

        res.status(StatusCodes.OK).json(weeklyReport);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

module.exports = {
    getWeeklyReport
}