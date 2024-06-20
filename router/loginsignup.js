/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - contact_info
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           description: The password for the user.
 *         contact_info:
 *           type: string
 *           description: Contact information for the user.
 *         isAdmin:
 *           type: boolean
 *           description: Indicates whether the user is an admin.
 *         isPrincipal:
 *           type: boolean
 *           description: Indicates whether the user is a principal.
 *         isTeacher:
 *           type: boolean
 *           description: Indicates whether the user is a teacher.
 *         isParent:
 *           type: boolean
 *           description: Indicates whether the user is a parent.
 *         managedBy:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the user who manages this user (if applicable).
 */

/**
 * @swagger
 * /api/v1/kidjourney/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user by checking email and password.
 *     tags: 
 *       - Login and Signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       '201':
 *         description: Successfully logged in. Returns user data and cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userCookie:
 *                   type: object
 *                   description: User data stored in a cookie.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid request body or credentials.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/kidjourney/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Create a new user account.
 *     tags: 
 *      - Login and Signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Successfully signed up. Returns user data and cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userCookie:
 *                   type: object
 *                   description: User data stored in a cookie.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid request body or could not create user.
 *       '500':
 *         description: Internal server error.
 */

const express = require('express');
const { login, signup } = require('../loginsignup/loginsignup');

const router = express.Router();

router.route('/login').post(login);
router.route('/signup').post(signup);

module.exports = router;