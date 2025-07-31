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
 *       - **Change Limits:**
 *         - Maximum 3 changes per appointment
 *         - Cannot reschedule more than 2 months from the original date
 *         - Original date is set on the first change
 *
 *       **MANAGER:**
 *       - Can only update their own appointments
 *       - Can cancel their own appointments (CANCELLED)
 *       - Can reject their own appointments (REJECTED)
 *       - Can change status to PENDING
 *       - **Change Limits:**
 *         - Maximum 3 changes per appointment
 *         - Cannot reschedule more than 2 months from the original date
 *
 *       **ADMIN:**
 *       - Can update any appointment
 *       - Can change any field and status
 *       - **No change limits applied**
 *
 *       **Status:**
 *       - PENDING: Appointment pending approval
 *       - CONFIRMED: Appointment approved
 *       - CANCELLED: Appointment cancelled by user
 *       - REJECTED: Appointment rejected by manager
 *
 *       **Business Rules:**
 *       - When a USER changes date/time, status automatically resets to PENDING
 *       - Original appointment date is preserved for change limit calculations
 *       - Change count is incremented on each date/time modification
 *       - Error messages clearly indicate when limits are exceeded
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
 *         description: "Appointment ID"
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
 *                 description: "New appointment date (validates 2-month limit for USER/MANAGER)"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: "New start time"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: "New end time"
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED, REJECTED]
 *                 description: "New appointment status (role restrictions)"
 *               cancelReason:
 *                 type: string
 *                 description: "Reason for cancellation (required when status is CANCELLED)"
 *     responses:
 *       200:
 *         description: "Appointment updated successfully"
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
 *                 originalDate:
 *                   type: string
 *                   format: date-time
 *                   description: "Original appointment date (set on first change)"
 *                 changeCount:
 *                   type: integer
 *                   description: "Number of times this appointment has been changed"
 *                 maxChanges:
 *                   type: integer
 *                   description: "Maximum number of changes allowed (default: 3)"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: |
 *           Invalid data, operation not allowed for user role, or business rule violation:
 *           - "Maximum number of changes (3) exceeded. Cannot modify appointment anymore."
 *           - "Cannot reschedule more than 2 months from the original date."
 *           - "Cancel reason is required when cancelling an appointment."
 *       401:
 *         description: "Invalid or missing authentication token"
 *       403:
 *         description: "User does not have permission to update this appointment"
 *       404:
 *         description: "Appointment not found"
 */
