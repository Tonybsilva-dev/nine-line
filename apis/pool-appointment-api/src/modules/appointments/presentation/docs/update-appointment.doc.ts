/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update appointment
 *     description: |
 *       Updates an existing appointment with specific rules by role:
 *
 *       **USER:**
 *       - Can only update their own appointments
 *       - Any date/time change resets the status to PENDING
 *       - Can cancel their own appointment (CANCELLED)
 *       - Cannot directly change other statuses
 *
 *       **MANAGER:**
 *       - Can only update their own appointments
 *       - Can cancel their own appointments (CANCELLED)
 *       - Can reject their own appointments (REJECTED)
 *       - Can change status to PENDING
 *
 *       **ADMIN:**
 *       - Can update any appointment
 *       - Can change any field and status
 *
 *       **Status:**
 *       - PENDING: Appointment pending approval
 *       - CONFIRMED: Appointment approved
 *       - CANCELLED: Appointment cancelled by user
 *       - REJECTED: Appointment rejected by manager
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: New appointment date
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: New start time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: New end time
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED, REJECTED]
 *                 description: "New appointment status (role restrictions)"
 *               cancelReason:
 *                 type: string
 *                 description: "Reason for cancellation (required when status is CANCELLED)"
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 spaceId:
 *                   type: string
 *                   format: uuid
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
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: "Invalid data, operation not allowed for user role"
 *       401:
 *         description: Invalid or missing authentication token
 *       403:
 *         description: "User does not have permission to update this appointment"
 *       404:
 *         description: Appointment not found
 */
