const express = require("express");
const router = express.Router();

const { login } = require("../controllers/auth.js");
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
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

router.post("/login", login);

module.exports = router;
