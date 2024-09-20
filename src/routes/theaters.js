const express = require("express");
const router = express.Router();

const {
  getTheaters,
  getTheater,
  createTheater,
  updateTheater,
  deleteTheater,
} = require("../controllers/theaters.js");
/**
 * @swagger
 * tags:
 *   name: Theaters
 *   description: Theater management operations
 */

/**
 * @swagger
 * /theaters:
 *   get:
 *     summary: Get all theaters
 *     tags: [Theaters]
 *     security: []
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
 *         description: List of theaters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Theater'
 *   post:
 *     summary: Create a new theater
 *     tags: [Theaters]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTheater'
 *     responses:
 *       201:
 *         description: Theater created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theater'
 */

/**
 * @swagger
 * /theaters/{id}:
 *   get:
 *     summary: Get a theater by ID
 *     tags: [Theaters]
 *     security: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The theater ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Theater details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theater'
 *       404:
 *         description: Theater not found
 *   put:
 *     summary: Update a theater by ID
 *     tags: [Theaters]
 *     security: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The theater ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Theater'
 *     responses:
 *       200:
 *         description: Theater updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theater'
 *       404:
 *         description: Theater not found
 *   delete:
 *     summary: Delete a theater by ID
 *     tags: [Theaters]
 *     security: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The theater ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Theater deleted
 *       404:
 *         description: Theater not found
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Address:
 *      type: object
 *      properties:
 *        city:
 *          type: string
 *          description: "The city of the address."
 *        state:
 *          type: string
 *          description: "The state of the address."
 *        street1:
 *          type: string
 *          description: "The primary street of the address."
 *        street2:
 *          type: string
 *          nullable: true
 *          description: "The secondary street of the address. This can be null."
 *        zipcode:
 *          type: string
 *          description: "The zipcode of the address."
 *      required:
 *        - city
 *        - state
 *        - street1
 *        - zipcode
 *    Geo:
 *      type: object
 *      properties:
 *        coordinates:
 *          type: array
 *          items:
 *            type: number
 *          description: "An array of geographic coordinates."
 *        type:
 *          type: string
 *          enum:
 *            - Point
 *          description: "Type of geographic coordinates. Typically 'Point'."
 *      required:
 *        - coordinates
 *        - type
 *    Location:
 *      type: object
 *      properties:
 *        address:
 *          $ref: '#/components/schemas/Address'
 *        geo:
 *          $ref: '#/components/schemas/Geo'
 *      required:
 *        - address
 *        - geo
 *    Theater:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          format: objectId
 *          description: "Unique identifier for the theater."
 *        location:
 *          $ref: '#/components/schemas/Location'
 *        theaterId:
 *          type: integer
 *          format: int32
 *          description: "Unique theater ID."
 *        name:
 *          type: string
 *      required:
 *        - _id
 *        - location
 *        - theaterId
 *        - name
 *    CreateTheater:
 *      type: object
 *      properties:
 *        location:
 *          $ref: '#/components/schemas/Location'
 *        theaterId:
 *          type: integer
 *          format: int32
 *          description: "Unique theater ID."
 *        name:
 *          type: string
 *      required:
 *        - location
 *        - theaterId
 *        - name
 */

router.get("/", getTheaters);

router.get("/:_id", getTheater);

router.post("/", createTheater);

router.put("/:_id", updateTheater);

router.delete("/:_id", deleteTheater);

module.exports = router;
