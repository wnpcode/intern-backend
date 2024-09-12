const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.js");
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         type: integer
 *         default: 1
 *       - in: query
 *         name: size
 *         type: integer
 *         default: 5
 *       - in: query
 *         name: name
 *         type: string
 *         default:
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
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
 *         - _id
 *         - address
 *         - company
 *         - email
 *         - id
 *         - name
 *         - phone
 *         - username
 *         - website
 *       properties:
 *         _id:
 *           type: string
 *           description: User ID
 *         address:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *             geo:
 *               type: object
 *               properties:
 *                 lat:
 *                   type: string
 *                 lng:
 *                   type: string
 *             street:
 *               type: string
 *             suite:
 *               type: string
 *             zipcode:
 *               type: string
 *         company:
 *           type: object
 *           properties:
 *             bs:
 *               type: string
 *             catchPhrase:
 *               type: string
 *             name:
 *               type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         username:
 *           type: string
 *         website:
 *           type: string
 */

router.get("/", getUsers);

router.get("/:_id", getUser);

router.post("/", createUser);

router.put("/:_id", updateUser);

router.delete("/:_id", deleteUser);

module.exports = router;
