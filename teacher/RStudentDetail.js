const Student = require('../models/Student');
const { StatusCodes } = require('http-status-codes');

const getStudentDetail = async (req,res) => {
    const { class_id } = req.query;
    const { id: studentID } = req.params;

    let query = {}
    if(class_id){
        query.class_id = class_id
    }
    if(studentID){
        query._id = studentID
    }

    const student = await Student.find(query);
    if(student.length === 0){
        return res.status(StatusCodes.NOT_FOUND).send(`No students found`);
    }
    res.status(StatusCodes.OK).json(student);
}

module.exports = {
    getStudentDetail
}