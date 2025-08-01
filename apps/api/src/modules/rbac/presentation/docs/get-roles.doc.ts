/**
 * @swagger
 * /rbac/roles:
 *   get:
 *     summary: List roles
 *     description: "Lists all available roles in the system with pagination"
 *     tags: [RBAC]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: "Page number"
 *       - name: perPage
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Items per page"
 *     responses:
 *       200:
 *         description: "List of roles"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       level:
 *                         type: integer
 *                       isSystem:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *       401:
 *         description: "Invalid or missing authentication token"
 *
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: "Unique role identifier"
 *         name:
 *           type: string
 *           description: "Role name"
 *         description:
 *           type: string
 *           description: "Role description"
 *         level:
 *           type: integer
 *           minimum: 0
 *           description: "Role hierarchy level (0=USER, 1=MANAGER, 2=ADMIN)"
 *         isSystem:
 *           type: boolean
 *           description: "Whether this is a system role"
 *         permissions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Permission'
 *           description: "List of permissions assigned to this role"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Role creation timestamp"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Last update timestamp"
 *
 *     Permission:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: "Unique permission identifier"
 *         name:
 *           type: string
 *           description: "Permission name"
 *         description:
 *           type: string
 *           description: "Permission description"
 *         resource:
 *           type: string
 *           description: "Resource this permission applies to"
 *         action:
 *           type: string
 *           description: "Action allowed by this permission"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Permission creation timestamp"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Last update timestamp"
 *
 *     UserRoleAssignment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: "Unique assignment identifier"
 *         userId:
 *           type: string
 *           format: uuid
 *           description: "ID of the user"
 *         roleId:
 *           type: string
 *           format: uuid
 *           description: "ID of the role"
 *         assignedBy:
 *           type: string
 *           format: uuid
 *           description: "ID of the user who assigned this role"
 *         assignedAt:
 *           type: string
 *           format: date-time
 *           description: "Assignment timestamp"
 *         role:
 *           $ref: '#/components/schemas/Role'
 *           description: "Role details"
 *
 *     AssignRoleRequest:
 *       type: object
 *       required:
 *         - userId
 *         - roleId
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: "ID of the user to assign the role to"
 *           example: "user-uuid"
 *         roleId:
 *           type: string
 *           format: uuid
 *           description: "ID of the role to assign"
 *           example: "role-uuid"
 *
 *     RevokeRoleRequest:
 *       type: object
 *       required:
 *         - userId
 *         - roleId
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: "ID of the user to revoke the role from"
 *           example: "user-uuid"
 *         roleId:
 *           type: string
 *           format: uuid
 *           description: "ID of the role to revoke"
 *           example: "role-uuid"
 *
 *     RoleResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Role'
 *
 *     RoleListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Role'
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
 *     UserPermissionsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               format: uuid
 *               description: "User ID"
 *             roles:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *               description: "User's roles"
 *             permissions:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 *               description: "User's permissions"
 *
 *     RBACError:
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
 *               enum: [VALIDATION_ERROR, USER_NOT_FOUND, ROLE_NOT_FOUND, PERMISSION_NOT_FOUND, UNAUTHORIZED, INSUFFICIENT_PERMISSIONS, ROLE_ALREADY_ASSIGNED, ROLE_NOT_ASSIGNED]
 *             statusCode:
 *               type: integer
 *               example: 400
 *
 *   responses:
 *     RoleList:
 *       description: "List of roles retrieved successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleListResponse'
 *
 *     RoleAssigned:
 *       description: "Role assigned successfully"
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
 *                 example: "Role assigned successfully"
 *
 *     RoleRevoked:
 *       description: "Role revoked successfully"
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
 *                 example: "Role revoked successfully"
 *
 *     UserPermissions:
 *       description: "User permissions retrieved successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPermissionsResponse'
 *
 *     RBACError:
 *       description: "RBAC operation failed"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RBACError'
 */
