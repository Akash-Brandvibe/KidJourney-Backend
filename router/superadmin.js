/**
 * @swagger
 * components:
 *   schemas:
 *     School:
 *       type: object
 *       required:
 *         - school_name
 *         - branch_name
 *         - address
 *         - contact_info
 *         - super_admin_id
 *         - principal_id
 *       properties:
 *         school_name:
 *           type: string
 *           description: The name of the school.
 *         branch_name:
 *           type: string
 *           description: The name of the branch.
 *         address:
 *           type: string
 *           description: The address of the school.
 *         contact_info:
 *           type: string
 *           description: Contact information for the school.
 *         super_admin_id:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the super admin associated with the school.
 *         principal_id:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the principal associated with the school.
 */

/**
 * @swagger
 * /api/v1/kidjourney/superadmin/school:
 *   get:
 *     summary: Get all schools
 *     description: Retrieve all schools associated with the super admin.
 *     tags:
 *       - Superadmin - School
 *     responses:
 *       '200':
 *         description: A list of schools.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 *       '404':
 *         description: No schools found.
 *       '500':
 *         description: Internal server error.
 *   post:
 *     summary: Create a new school
 *     description: Create a new school associated with the super admin.
 *     tags:
 *       - Superadmin - School
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/School'
 *     responses:
 *       '201':
 *         description: The newly created school.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       '400':
 *         description: Invalid request body.
 *       '500':
 *         description: Internal server error.
 * /api/v1/kidjourney/superadmin/school/{id}:
 *   get:
 *     summary: Get a school by ID
 *     description: Retrieve a school by its ID.
 *     tags:
 *       - Superadmin - School
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the school to retrieve.
 *     responses:
 *       '200':
 *         description: The requested school.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       '404':
 *         description: School not found.
 *       '500':
 *         description: Internal server error.
 *   patch:
 *     summary: Update a school
 *     description: Update a school's information.
 *     tags:
 *       - Superadmin - School
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the school to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/School'
 *     responses:
 *       '200':
 *         description: The updated school.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       '400':
 *         description: Invalid request body or parameters.
 *       '404':
 *         description: School not found.
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a school
 *     description: Delete a school by its ID.
 *     tags:
 *       - Superadmin - School
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the school to delete.
 *     responses:
 *       '200':
 *         description: The deleted school.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       '400':
 *         description: Invalid request parameters.
 *       '404':
 *         description: School not found.
 *       '500':
 *         description: Internal server error.
 * 
 */

/**
 * @swagger
 * /api/v1/kidjourney/superadmin/principal:
 *   get:
 *     summary: Get all principals
 *     description: Retrieve all principals managed by the super admin.
 *     tags:
 *       - Superadmin - Principal
 *     responses:
 *       '200':
 *         description: A list of principals.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '404':
 *         description: No principals found.
 *       '500':
 *         description: Internal server error.
 *   post:
 *     summary: Create a new principal
 *     description: Create a new principal associated with the super admin.
 *     tags:
 *       - Superadmin - Principal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: The newly created principal.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid request body.
 *       '500':
 *         description: Internal server error.
 * 
 * /api/v1/kidjourney/superadmin/principal/{id}:
 *   get:
 *     summary: Get a principal by ID
 *     description: Retrieve a principal by its ID.
 *     tags:
 *       - Superadmin - Principal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the principal to retrieve.
 *     responses:
 *       '200':
 *         description: The requested principal.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: Principal not found.
 *       '500':
 *         description: Internal server error.
 *   patch:
 *     summary: Update a principal
 *     description: Update a principal's information.
 *     tags:
 *       - Superadmin - Principal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the principal to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: The updated principal.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid request body or parameters.
 *       '404':
 *         description: Principal not found or not managed by the super admin.
 *       '500':
 *         description: Internal server error.
 */

const express = require('express');
const router = express.Router();

const  {
    getAllPrincipal,
    getPrincipal,
    createPrincipal,
    updatePrincipal
} = require('../superadmin/CRUDPrincipal');

const {
    getSchool,
    getAllSchool,
    createSchool,
    updateSchool,
    deleteSchool
} = require('../superadmin/CRUDSchool');

router.route('/principal').get(getAllPrincipal).post(createPrincipal);
router.route('/principal/:id').get(getPrincipal).patch(updatePrincipal);

router.route('/school').get(getAllSchool).post(createSchool);
router.route('/school/:id').get(getSchool).patch(updateSchool).delete(deleteSchool);

module.exports = router;
