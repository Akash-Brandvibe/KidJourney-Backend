const { StatusCodes } = require('http-status-codes');
const Timetable = require('../models/Timetable');
const User = require('../models/User');
const Class = require('../models/Class');

const getAllTT = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;

        const timetable = await Timetable.find({ principal_id: principalID });
        if(timetable.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).send(`No Timetables under Principal`);
        }

        res.status(StatusCodes.OK).json(timetable);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const getTT = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { id: timetableID } = req.params;

        const timetable = await Timetable.findOne({ principal_id: principalID, _id: timetableID });
        if(!timetable){
            return res.status(StatusCodes.NOT_FOUND).send(`Timetable not found`);
        }

        res.status(StatusCodes.OK).json(timetable);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const createTT = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { class_id, day_of_the_week, start_time, end_time, subject, teacher_id } = req.body;

        if(!class_id || !day_of_the_week || !start_time || !end_time || !subject || !teacher_id) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Please provide all necessary details`);
        }

        const existingClass = await Class.findOne({_id: class_id, principal_id: principalID });
        if(!existingClass){
            return res.status(StatusCodes.UNAUTHORIZED).send(`Not authorized to make TimeTable, no such class`);
        }

        const existingTeacher = await User.findOne({_id: teacher_id, managedBy: principalID, isTeacher: true });
        if(!existingTeacher){
            return res.status(StatusCodes.UNAUTHORIZED).send(`Not authorized to make TimeTable, no such teacher`);
        }

        const timetable = await Timetable.create({
            class_id: class_id,
            day_of_the_week: day_of_the_week,
            start_time: start_time,
            end_time: end_time,
            subject: subject,
            teacher_id: teacher_id,
            principal_id: principalID
        });
        res.status(StatusCodes.CREATED).json(timetable);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const updateTT = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { class_id, day_of_the_week, start_time, end_time, subject, teacher_id } = req.body;
        const { id: timetableID } = req.params;

        let updates = {}

        if(class_id){
            const existingClass = await Class.findOne({_id: class_id, principal_id: principalID });
            if(!existingClass){
                return res.status(StatusCodes.UNAUTHORIZED).send(`Not authorized to make TimeTable`);
            }
            else{
                updates.class_id = class_id
            }
        }

        if(teacher_id){
            const existingTeacher = await User.findOne({_id: teacher_id, managedBy: principalID, isTeacher: true });
            if(!existingTeacher){
                return res.status(StatusCodes.UNAUTHORIZED).send(`Not authorized to make TimeTable`);
            }
            else{
                updates.teacher_id = teacher_id;
            }
        }

        if(day_of_the_week){
            updates.day_of_the_week = day_of_the_week;
        }
        if(start_time){
            updates.start_time = start_time
        }
        if(end_time){
            updates.end_time = end_time;
        }
        if(subject){
            updates.subject = subject
        }

        const timetable = await Timetable.findOneAndUpdate(
            { _id: timetableID, principal_id: principalID},
            updates,
            { new: true, runValidators: true }
        );
        res.status(StatusCodes.OK).json(timetable);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

const deleteTT = async (req,res) => {
    try {
        const { userID: principalID } = req.cookies.user;
        const { id: timetableID } = req.params;

        const timetable = await Timetable.findOneAndDelete({ _id: timetableID, principal_id: principalID});
        if(!timetable){
            return res.status(StatusCodes.NOT_FOUND).send(`No timetable found`);
        }
        res.status(StatusCodes.OK).json(timetable);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong`);
    }
}

module.exports = {
    getAllTT,
    getTT,
    createTT,
    updateTT,
    deleteTT
}