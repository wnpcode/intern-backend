const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { uploadSingle } = require("../controllers/upload.js");
const { authenticateToken } = require("../middlewares/authMiddleware.js");

router.post("/single", upload.single("file"), uploadSingle);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Upload operations
 */

/**
 * @swagger
 * /upload/single:
 *   post:
 *     security:
 *         - BearerAuth: []
 *     summary: Upload an image
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filePath:
 *                   type: string
 *       400:
 *         description: No file uploaded
 */
