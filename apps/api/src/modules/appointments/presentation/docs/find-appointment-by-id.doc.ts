/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Find appointment by ID
 *     description: |
 *       Retrieves a single appointment by its ID. Requires authentication.
 *       - **USER:** Can only view their own appointments.
 *       - **MANAGER:** Can only view appointments for spaces they host.
 *       - **ADMIN:** Can view any appointment.
 *
 *       **Change Tracking Information:**
 *       - originalDate: Date of the first appointment (used for change limit calculations)
 *       - changeCount: Number of times this appointment has been modified
 *       - maxChanges: Maximum number of changes allowed for this appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment found successfully
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
 *                   description: Original appointment date (for change limit calculations)
 *                 changeCount:
 *                   type: integer
 *                   description: Number of times this appointment has been changed
 *                 maxChanges:
 *                   type: integer
 *                   description: Maximum number of changes allowed
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Invalid or missing authentication token
 *       403:
 *         description: User does not have permission to view this appointment
 *       404:
 *         description: Appointment not found
 */
