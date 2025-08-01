/**
 * @swagger
 * /spaces:
 *   post:
 *     summary: Create a new space
 *     description: |
 *       Creates a new space. Requires authentication.
 *       - **ADMIN:** Can create a space for any host.
 *       - **MANAGER:** Can create a space only for themselves (hostId is always their userId).
 *       - **USER:** Cannot create spaces.
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: "Space title"
 *               description:
 *                 type: string
 *                 description: "Space description"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of photo URLs"
 *               rules:
 *                 type: string
 *                 description: "Space rules"
 *               hostId:
 *                 type: string
 *                 description: "ID of the user who owns/hosts the space (required for ADMIN, auto-set for MANAGER)"
 *     responses:
 *       201:
 *         description: "Space created successfully"
 *       400:
 *         description: "Invalid data"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       403:
 *         description: "User does not have permission to create spaces"
 *
 * @swagger
 * components:
 *   schemas:
 *     Space:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: "Unique space identifier"
 *         title:
 *           type: string
 *           description: "Space title"
 *         description:
 *           type: string
 *           description: "Space description"
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: "Array of photo URLs"
 *         rules:
 *           type: string
 *           description: "Space rules"
 *         hostId:
 *           type: string
 *           format: uuid
 *           description: "ID of the user who owns/hosts the space"
 *         averageRating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           description: "Average rating of the space"
 *         totalRatings:
 *           type: integer
 *           minimum: 0
 *           description: "Total number of ratings"
 *         isActive:
 *           type: boolean
 *           description: "Whether the space is active"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Space creation timestamp"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Last update timestamp"
 *
 *     CreateSpaceRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: "Space title"
 *           example: "Modern Office Space"
 *         description:
 *           type: string
 *           description: "Space description"
 *           example: "A modern office space with all amenities"
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: "Array of photo URLs"
 *           example: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"]
 *         rules:
 *           type: string
 *           description: "Space rules"
 *           example: "No smoking, No pets"
 *         hostId:
 *           type: string
 *           format: uuid
 *           description: "ID of the user who owns/hosts the space (required for ADMIN, auto-set for MANAGER)"
 *
 *     UpdateSpaceRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: "New space title"
 *         description:
 *           type: string
 *           description: "New space description"
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: "New array of photo URLs"
 *         rules:
 *           type: string
 *           description: "New space rules"
 *         isActive:
 *           type: boolean
 *           description: "New active status"
 *
 *     SpaceResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Space'
 *
 *     SpaceListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Space'
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
 *     SpaceError:
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
 *               enum: [VALIDATION_ERROR, SPACE_NOT_FOUND, HOST_NOT_FOUND, UNAUTHORIZED, INSUFFICIENT_PERMISSIONS]
 *             statusCode:
 *               type: integer
 *               example: 400
 *
 *   responses:
 *     SpaceCreated:
 *       description: "Space created successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SpaceResponse'
 *
 *     SpaceUpdated:
 *       description: "Space updated successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SpaceResponse'
 *
 *     SpaceDeleted:
 *       description: "Space deleted successfully"
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
 *                 example: "Space deleted successfully"
 *
 *     SpaceList:
 *       description: "List of spaces retrieved successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SpaceListResponse'
 *
 *     SpaceError:
 *       description: "Space operation failed"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SpaceError'
 */
