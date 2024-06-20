const express = require('express');
const router = express.Router();

const {
    getAllReq,
    getReq,
    createReq,
    updateReq,
    deleteReq
} = require('../parent/EnrolmentReq');

const {
    getCICO
} = require('../parent/RCICO');

const {
    getPickup,
    createPickup,
    updatePickup,
    deletePickup
} = require('../parent/CRUDPickup');

const {
    getWeeklyReport
} = require('../parent/RWeeklyReport');

const {
    getHomeWorkSubmission
} = require('../parent/RHomeWork');

router.route('/enrolmentreq').post(createReq).get(getAllReq);
router.route('/enrolmentreq/:id').get(getReq).patch(updateReq).delete(deleteReq);

router.route('/CICO/:id').get(getCICO);

router.route('/pickup').post(createPickup);
router.route('/pickup/:id').patch(updatePickup).get(getPickup).delete(deletePickup);

router.route('/weekly-report/:id').get(getWeeklyReport);

router.route('/homework/:id').get(getHomeWorkSubmission);

module.exports = router;