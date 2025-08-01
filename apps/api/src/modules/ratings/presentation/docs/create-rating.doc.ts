/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Creates a new rating for a space
 *     description: |
 *       Creates a new rating for a space. Requires authentication.
 *       - **USER:** Can create ratings for spaces they have used.
 *       - **MANAGER/ADMIN:** Cannot create ratings.
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spaceId:
 *                 type: string
 *                 description: "Space ID"
 *               userId:
 *                 type: string
 *                 description: "User ID"
 *               score:
 *                 type: number
 *                 description: "Score (1 to 5)"
 *               comment:
 *                 type: string
 *                 description: "Comment"
 *     responses:
 *       201:
 *         description: "Rating created successfully"
 *       400:
 *         description: "Invalid data"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       403:
 *         description: "User does not have permission to create ratings"
 *
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: "Unique rating identifier"
 *         userId:
 *           type: string
 *           format: uuid
 *           description: "ID of the user who created the rating"
 *         spaceId:
 *           type: string
 *           format: uuid
 *           description: "ID of the space being rated"
 *         score:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: "Rating score from 1 to 5"
 *         comment:
 *           type: string
 *           description: "User's comment about the space"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Rating creation timestamp"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Last update timestamp"
 *
 *     CreateRatingRequest:
 *       type: object
 *       required:
 *         - spaceId
 *         - score
 *       properties:
 *         spaceId:
 *           type: string
 *           format: uuid
 *           description: "ID of the space being rated"
 *           example: "space-uuid"
 *         score:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: "Rating score from 1 to 5"
 *           example: 5
 *         comment:
 *           type: string
 *           description: "User's comment about the space"
 *           example: "Great space!"
 *
 *     UpdateRatingRequest:
 *       type: object
 *       properties:
 *         score:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: "New rating score"
 *         comment:
 *           type: string
 *           description: "New comment"
 *
 *     RatingResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Rating'
 *
 *     RatingListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Rating'
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             total:
 *               type: integer
 *               example: 50
 *             totalPages:
 *               type: integer
 *               example: 5
 *
 *     RatingError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *             code:
 *               type: string
 *               enum: [VALIDATION_ERROR, RATING_NOT_FOUND, SPACE_NOT_FOUND, USER_NOT_FOUND, UNAUTHORIZED, INSUFFICIENT_PERMISSIONS]
 *             statusCode:
 *               type: integer
 *               example: 400
 *
 *   responses:
 *     RatingCreated:
 *       description: "Rating created successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RatingResponse'
 *
 *     RatingUpdated:
 *       description: "Rating updated successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RatingResponse'
 *
 *     RatingDeleted:
 *       description: "Rating deleted successfully"
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Rating deleted successfully"
 *
 *     RatingList:
 *       description: "List of ratings retrieved successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RatingListResponse'
 *
 *     RatingError:
 *       description: "Rating operation failed"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RatingError'
 */
// Example payload:
// {
//   "spaceId": "space-uuid",
//   "userId": "user-uuid",
//   "score": 5,
//   "comment": "Great space!"
// }
