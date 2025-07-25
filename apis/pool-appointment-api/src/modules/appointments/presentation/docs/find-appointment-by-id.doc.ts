/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Find appointment by ID
 *     description: |
 *       - **USER:** Can view only their own appointments.
 *       - **MANAGER:** Can view appointments of their spaces.
 *       - **ADMIN:** Can view any appointment.
 *     tags: [Appointments]
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
 *                   enum: [PENDING, CONFIRMED, CANCELLED]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Appointment not found
 */
