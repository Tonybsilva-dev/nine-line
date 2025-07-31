/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     description: |
 *       Creates a new appointment. Requires authentication.
 *       - **USER:** Can create appointments for themselves.
 *       - **MANAGER:** Can create appointments for themselves or for users in their spaces (if applicable).
 *       - **ADMIN:** Can create appointments for any user.
 *
 *       **Change Tracking:**
 *       - New appointments start with changeCount = 0
 *       - originalDate is set to the appointment date
 *       - maxChanges defaults to 3 for USER/MANAGER roles
 *       - ADMIN appointments have no change limits
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - spaceId
 *               - date
 *               - startTime
 *               - endTime
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: "ID of the user creating the appointment"
 *               spaceId:
 *                 type: string
 *                 format: uuid
 *                 description: "ID of the space being scheduled"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: "Appointment date"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: "Appointment start time"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: "Appointment end time"
 *     responses:
 *       201:
 *         description: "Appointment created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 spaceId:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   enum: [PENDING, CONFIRMED, CANCELLED, REJECTED]
 *                 originalDate:
 *                   type: string
 *                   format: date-time
 *                   description: "Original appointment date (same as creation date initially)"
 *                 changeCount:
 *                   type: integer
 *                   description: "Number of changes made (0 for new appointments)"
 *                 maxChanges:
 *                   type: integer
 *                   description: "Maximum changes allowed (3 for USER/MANAGER, unlimited for ADMIN)"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: "Invalid data or time conflict"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       404:
 *         description: "User or space not found"
 */
