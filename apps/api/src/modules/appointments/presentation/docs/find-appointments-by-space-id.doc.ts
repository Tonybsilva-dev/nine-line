/**
 * @swagger
 * /appointments/space/{spaceId}:
 *   get:
 *     summary: List appointments by space
 *     description: |
 *       Returns a paginated list of appointments for a specific space.
 *       Includes change tracking information for each appointment.
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: spaceId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: "Space ID"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: "Page number"
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: "Items per page"
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: "Field to order by"
 *       - in: query
 *         name: orderDirection
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: "Order direction"
 *     responses:
 *       200:
 *         description: "Appointments list returned successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: "Total appointments"
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
 *                       originalDate:
 *                         type: string
 *                         format: date-time
 *                         description: "Original appointment date"
 *                       changeCount:
 *                         type: integer
 *                         description: "Number of changes made"
 *                       maxChanges:
 *                         type: integer
 *                         description: "Maximum changes allowed"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: "Invalid pagination parameters"
 */
