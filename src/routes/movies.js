const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authMiddleware.js");

const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  setTheater,
  getMoviesByTheaterId,
} = require("../controllers/movies.js");

router.get("/", getMovies);
router.get("/:_id", getMovie);
router.get("/by_theater_id/:_id", getMoviesByTheaterId);
router.post("/:_id/theaters", setTheater);
router.post("/", authenticateToken, createMovie);
router.put("/:_id", authenticateToken, updateMovie);
router.delete("/:_id", authenticateToken, deleteMovie);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: CRUD operations for movies
 */

/**
 * @swagger
 * paths:
 *   /movies:
 *     post:
 *       tags: [Movies]
 *       security:
 *         - BearerAuth: []
 *       summary: Create a new movie
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       responses:
 *         '201':
 *           description: Movie created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Movie'
 *         '400':
 *           description: Invalid input
 *
 *     get:
 *       tags: [Movies]
 *       security: []
 *       summary: Get all movies
 *       responses:
 *         '200':
 *           description: A list of movies
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Movie'
 *
 *   /movies/{id}:
 *     get:
 *       tags: [Movies]
 *       security: []
 *       summary: Get a movie by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Movie ID
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Movie found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Movie'
 *         '404':
 *           description: Movie not found
 *
 *     put:
 *       tags: [Movies]
 *       security:
 *         - BearerAuth: []
 *       summary: Update a movie by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Movie ID
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       responses:
 *         '200':
 *           description: Movie updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Movie'
 *         '400':
 *           description: Invalid input
 *         '404':
 *           description: Movie not found
 *
 *     delete:
 *       tags: [Movies]
 *       security:
 *         - BearerAuth: []
 *       summary: Delete a movie by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Movie ID
 *           schema:
 *             type: string
 *       responses:
 *         '204':
 *           description: Movie deleted successfully
 *         '404':
 *           description: Movie not found
 *
 *   /movies/{id}/theaters:
 *     post:
 *       tags: [Movies]
 *       security:
 *       - BearerAuth: []
 *       summary: Set a movie's theater
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Movie ID
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["string"]
 *       responses:
 *         '200':
 *           description: Movie updated successfully
 *           content:
 *             application/json:
 *               schema:
 *   /movies/by_theater_id/{_id}:
 *      get:
 *        summary: Get movies by theater id
 *        tags: [Movies]
 *        security: []
 *        parameters:
 *           - in: path
 *             name: _id
 *             required: true
 *             description: theater Id
 *             type: string
 *        responses:
 *          200:
 *            description: List of movies
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/ComboTheater'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Awards:
 *      type: object
 *      properties:
 *        wins:
 *          type: integer
 *          default: 0
 *        nominations:
 *          type: integer
 *          default: 0
 *        text:
 *          type: string
 *    IMDb:
 *      type: object
 *      properties:
 *        rating:
 *          type: number
 *          format: float
 *          minimum: 0
 *          maximum: 10
 *        votes:
 *          type: integer
 *        id:
 *          type: string
 *          required: true
 *    Tomatoes:
 *      type: object
 *      properties:
 *        lastUpdated:
 *          type: string
 *          format: date
 *        viewer:
 *          type: object
 *          properties:
 *            rating:
 *              type: number
 *              format: float
 *              minimum: 0
 *              maximum: 10
 *            numReviews:
 *              type: integer
 *            fresh:
 *              type: integer
 *            rotten:
 *              type: integer
 *        critic:
 *          type: object
 *          properties:
 *            rating:
 *              type: number
 *              format: float
 *              minimum: 0
 *              maximum: 10
 *            numReviews:
 *              type: integer
 *            fresh:
 *              type: integer
 *            rotten:
 *              type: integer
 *    Movie:
 *      type: object
 *      properties:
 *        awards:
 *          $ref: '#/components/schemas/Awards'
 *        cast:
 *          type: array
 *          items:
 *            type: string
 *        countries:
 *          type: array
 *          items:
 *            type: string
 *          required: true
 *        directors:
 *          type: array
 *          items:
 *            type: string
 *        fullplot:
 *          type: string
 *        genres:
 *          type: array
 *          items:
 *            type: string
 *        imdb:
 *          $ref: '#/components/schemas/IMDb'
 *          required: true
 *        languages:
 *          type: array
 *          items:
 *            type: string
 *        lastupdated:
 *          type: string
 *          required: true
 *        metacritic:
 *          type: mixed
 *        num_mflix_comments:
 *          type: integer
 *          required: true
 *        plot:
 *          type: string
 *        poster:
 *          type: string
 *        rated:
 *          type: mixed
 *        released:
 *          type: string
 *          format: date
 *        runtime:
 *          type: mixed
 *        title:
 *          type: string
 *          required: true
 *        tomatoes:
 *          $ref: '#/components/schemas/Tomatoes'
 *        type:
 *          type: string
 *          required: true
 *        writers:
 *          type: array
 *          items:
 *            type: string
 *          required: true
 *        year:
 *          type: mixed
 *          required: true
 *          description: Must be a number or a string in 'YYYYè' format.
 *    ComboMovies:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         format: objectId
 *         description: "Unique identifier for the movie Combo."
 *       name:
 *         type: string
 *     required:
 *       - _id
 *       - name
 */
