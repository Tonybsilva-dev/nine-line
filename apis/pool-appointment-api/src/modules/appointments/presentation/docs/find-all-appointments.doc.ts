/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: List appointments
 *     description: |
 *       Returns a paginated list of appointments, with behavior depending on the authenticated user type:
 *
 *       - **ADMIN:** Lists all appointments in the system.
 *       - **MANAGER:** Lists only appointments for spaces where they are host.
 *       - **USER:** Lists only their own appointments.
 *
 *       Authentication via Bearer Token is required.
 *     tags: [Appointments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to order by
 *       - in: query
 *         name: orderDirection
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Order direction
 *     responses:
 *       200:
 *         description: Appointments list returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total appointments
 *                 appointments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       spaceId:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                         enum: [PENDING, CONFIRMED, CANCELLED, REJECTED]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid pagination parameters
 */
