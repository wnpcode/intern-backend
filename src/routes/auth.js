const express = require("express");
const router = express.Router();

const { login, checkToken, forgetPassword } = require("../controllers/auth.js");
const { authenticateToken } = require("../middlewares/authMiddleware.js");
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth operations
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     security: []
 *     summary: Login
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: email
 *         type: string
 *         default: string
 *       - in: query
 *         name: password
 *         type: string
 *         default: string
 *     responses:
 *       200:
 *         description: Successful login
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /auth/change_password:
 *   post:
 *     security: []
 *     summary: Reset Password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/change_password'
 *     responses:
 *       200:
 *         description: Password changed
 *       400:
 *         description: Password not match
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /auth/check_token:
 *   get:
 *     summary: Check Token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token valid
 *       401:
 *         description: Token expired
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     change_password:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - retypePassword
 *       properties:
 *         email:
 *           type: string
 *         retypePassword:
 *           type: string
 *         password:
 *           type: string
 */

router.post("/login", login);
router.post("/change_password", forgetPassword);
router.get("/check_token", authenticateToken, checkToken);

module.exports = router;
