

const express = require('express');
const router = express.Router();

const {
    getAllClasses,
    getClass,
    createClass,
    updateClass,
    deleteClass
} = require('../principal/CRUDClass');

const {
    getAllTeachers,
    getTeacher,
    createTeacher,
    updateTeacher
} = require('../principal/CRUDTeacher');

const {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../principal/CRUDEvent');

const {
    getAllStudent,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
} = require('../principal/CRUDStudent');

const {
    getAllParents,
    getParent,
    updateParent
} = require('../principal/CRUDParent');

const {
    getAllTT,
    getTT,
    createTT,
    updateTT,
    deleteTT
} = require('../principal/CRUDTimetable');

router.route('/class').get(getAllClasses).post(createClass);
router.route('/class/:id').get(getClass).patch(updateClass).delete(deleteClass);

router.route('/teacher').get(getAllTeachers).post(createTeacher);
router.route('/teacher/:id').get(getTeacher).patch(updateTeacher);

router.route('/parent').get(getAllParents)
router.route('/parent/:id').get(getParent).patch(updateParent);

router.route('/event').get(getAllEvents).post(createEvent)
router.route('/event/:id').get(getEvent).patch(updateEvent).delete(deleteEvent);

router.route('/student').get(getAllStudent).post(createStudent);
router.route('/student/:id').get(getStudent).patch(updateStudent).delete(deleteStudent);

router.route('/timetable').get(getAllTT).post(createTT);
router.route('/timetable/:id').get(getTT).patch(updateTT).delete(deleteTT);

module.exports = router;