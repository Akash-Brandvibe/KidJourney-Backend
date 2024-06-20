const { StatusCodes } = require('http-status-codes');
const WeeklyReport = require('../models/WeeklyReport');

const getAllWeeklyReports = async (req, res) => {
    try {
        const { userID: teacherId } = req.cookies.user;
        const weeklyReports = await WeeklyReport.find({ teacher_id: teacherId });
        
        if (weeklyReports.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).send('No weekly reports found');
        }
        
        res.status(StatusCodes.OK).json(weeklyReports);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
};

const getWeeklyReport = async (req, res) => {
    try {
        const { id: weeklyReportId } = req.params;
        const { userID: teacherId } = req.cookies.user;

        const weeklyReport = await WeeklyReport.find({ _id: weeklyReportId, teacher_id: teacherId })
        
        if (!weeklyReport) {
            return res.status(StatusCodes.NOT_FOUND).send('Weekly report not found');
        }
        
        res.status(StatusCodes.OK).json(weeklyReport);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
};

const createWeeklyReport = async (req, res) => {
    try {
        const { studentId, weekStartDate, weekEndDate, subjects, overallComments } = req.body;
        const { userID: teacherId } = req.cookies.user;

        const weeklyReportEntry = await WeeklyReport.create({
            student_id: studentId,
            teacher_id: teacherId,
            week_start_date: weekStartDate,
            week_end_date: weekEndDate,
            subjects: subjects,
            overall_comments: overallComments
        });
        
        res.status(StatusCodes.CREATED).json(weeklyReportEntry);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
};

const updateWeeklyReport = async (req, res) => {
    try {
        const { id: weeklyReportId } = req.params;
        const { userID: teacherId } = req.cookies.user;
        const { subjects, overallComments } = req.body;

        let updates = {};
        if(subjects){
            updates.subjects = subjects;
        }
        if(overallComments){
            updates.overallComments = overallComments
        }

        const weeklyReportUpdate = await WeeklyReport.findOneAndUpdate(
            { _id: weeklyReportId, teacher_id: teacherId},
            updates,
            { new: true, runValidators: true }
        )
        
        if (!weeklyReportUpdate) {
            return res.status(StatusCodes.NOT_FOUND).send('Weekly report not found');
        }
        
        res.status(StatusCodes.OK).json(weeklyReportUpdate);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
};

const deleteWeeklyReport = async (req, res) => {
    try {
        const { id: weeklyReportId } = req.params;
        const { userID: teacherId } = req.cookies.user;

        const weeklyReport = await WeeklyReport.findOneAndDelete({ _id: weeklyReportId, teacher_id: teacherId })
        
        if (!weeklyReport) {
            return res.status(StatusCodes.NOT_FOUND).send('Weekly report not found');
        }
        
        res.status(StatusCodes.OK).json(weeklyReport);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
};

module.exports = {
    getAllWeeklyReports,
    getWeeklyReport,
    createWeeklyReport,
    updateWeeklyReport,
    deleteWeeklyReport
};
