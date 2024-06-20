const { StatusCodes } = require("http-status-codes");
const Homework = require('../models/HomeWork');
const HomeworkSubmission = require('../models/HomeWorkSubmission');
const Student = require('../models/Student');

const getAllHomeWorks = async (req, res) => {
    try {
        const { classId } = req.query;
        const { userID: teacherId } = req.cookies.user;

        if (!classId || !teacherId) {
            return res.status(StatusCodes.BAD_REQUEST).send('Class ID and Teacher ID are required');
        }

        const homeWorks = await Homework.find({ class_id: classId, teacher_id: teacherId });

        if (homeWorks.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).send('No homeworks found');
        }

        res.status(StatusCodes.OK).json(homeWorks);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
}


const getHomeWork = async (req,res) => {
    try {
        const { classId } = req.query;
        const { userID: teacherId } = req.cookies.user;
        const { id: homeWorkId } = req.params;

        if (!classId || !teacherId || !homeWorkId) {
            return res.status(StatusCodes.BAD_REQUEST).send('Please provide necessary details');
        }

        const homeWork = await Homework.findOne({ class_id: classId, teacher_id: teacherId, _id: homeWorkId });

        if (!homeWork) {
            return res.status(StatusCodes.NOT_FOUND).send('No homework found');
        }
        res.status(StatusCodes.OK).json(homeWork);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
}

const createHomeWork = async (req, res) => {
    try {
        const { classId, title, description, due_date } = req.body;
        const { userID: teacherId } = req.cookies.user;

        if (!classId || !title || !description || !due_date) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide necessary details`);
        }

        const homeWorkEntry = await Homework.create({
            class_id: classId,
            teacher_id: teacherId,
            title: title,
            description: description,
            due_date: due_date
        });

        const students = await Student.find({ class_id: classId });
        const studentIds = students.map(student => student._id);

        const submissions = studentIds.map(studentId => ({
            homework_id: homeWorkEntry._id,
            student_id: studentId,
            title: title,
            description: description,
            due_date: due_date
        }));

        await HomeworkSubmission.insertMany(submissions);

        res.status(StatusCodes.OK).json(homeWorkEntry);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
};

const updateHomeWork = async (req, res) => {
    try {
        const { title, description, due_date } = req.body;
        const { userID: teacherId } = req.cookies.user;
        const { id: homeWorkId } = req.params;

        let updates = {};

        if (title) {
            updates.title = title;
        }
        if (description) {
            updates.description = description;
        }
        if (due_date) {
            updates.due_date = due_date;
        }

        const homeWorkUpdate = await Homework.findOneAndUpdate(
            { _id: homeWorkId, teacher_id: teacherId },
            updates,
            { new: true, runValidators: true }
        );

        if (!homeWorkUpdate) {
            return res.status(StatusCodes.NOT_FOUND).send('Homework not found');
        }

        await HomeworkSubmission.updateMany(
            { homework_id: homeWorkUpdate._id },
            { $set: updates }
        );

        res.status(StatusCodes.OK).json(homeWorkUpdate);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
};


const deleteHomeWork = async (req,res) => {
    try {
        const { userID: teacherId } = req.cookies.user;
        const { id: homeWorkId } = req.params;

        const homeWork = await Homework.findOneAndDelete({ _id: homeWorkId, teacher_id: teacherId });

        await HomeworkSubmission.deleteMany({ homework_id: homeWorkId });

        res.status(StatusCodes.OK).json(homeWork);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }
}

module.exports = {
    getAllHomeWorks,
    getHomeWork,
    createHomeWork,
    updateHomeWork,
    deleteHomeWork
}