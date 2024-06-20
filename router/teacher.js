const express = require('express');
const router = express.Router();

const {
    getCICO,
    getAllCICO,
    createCICO,
    updateCICO,
    deleteCICO
} = require('../teacher/CRUDCheckinCheckout');

const {
    getStudentDetail
} = require('../teacher/RStudentDetail');

const {
    getAllHomeWorks,
    getHomeWork,
    createHomeWork,
    updateHomeWork,
    deleteHomeWork
} = require('../teacher/CRUDHomework');

router.route('/CICO').post(createCICO);

router.route('/student-details/:id').get(getStudentDetail);

router.route('homework').get(getAllHomeWorks).post(createHomeWork);
router.route('homework/:id').get(getHomeWork).patch(updateHomeWork).delete(deleteHomeWork);

module.exports = router;