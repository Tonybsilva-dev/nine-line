/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE, BLOCKED, PENDING]
 *     responses:
 *       201:
 *         description: "User created"
 *       400:
 *         description: "Validation error"
 *
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: "Unique user identifier"
 *         name:
 *           type: string
 *           description: "User's full name"
 *         email:
 *           type: string
 *           format: email
 *           description: "User's email address"
 *         role:
 *           type: string
 *           enum: [USER, MANAGER, ADMIN]
 *           description: "User's role in the system"
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, BLOCKED, PENDING]
 *           description: "User's current status"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "User creation timestamp"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Last update timestamp"
 *
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: "User's full name"
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: "User's email address"
 *           example: "john@example.com"
 *         password:
 *           type: string
 *           description: "User's password"
 *           example: "password123"
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, BLOCKED, PENDING]
 *           description: "User's initial status"
 *           example: "ACTIVE"
 *
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: "User's full name"
 *         email:
 *           type: string
 *           format: email
 *           description: "User's email address"
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, BLOCKED, PENDING]
 *           description: "User's status"
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/User'
 *
 *     UserListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
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
 *     UserError:
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
 *               enum: [VALIDATION_ERROR, USER_NOT_FOUND, EMAIL_ALREADY_EXISTS, UNAUTHORIZED]
 *             statusCode:
 *               type: integer
 *               example: 400
 *
 *   responses:
 *     UserCreated:
 *       description: "User created successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserResponse'
 *
 *     UserUpdated:
 *       description: "User updated successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserResponse'
 *
 *     UserDeleted:
 *       description: "User deleted successfully"
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
 *                 example: "User deleted successfully"
 *
 *     UserList:
 *       description: "List of users retrieved successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserListResponse'
 *
 *     UserError:
 *       description: "User operation failed"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserError'
 */
