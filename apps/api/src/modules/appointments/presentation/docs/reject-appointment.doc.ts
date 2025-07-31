/**
 * @swagger
 * /appointments/{id}/reject:
 *   patch:
 *     summary: Reject an appointment
 *     description: "Rejects a pending or confirmed appointment, changing its status to CANCELLED"
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: "ID of the appointment to reject"
 *     responses:
 *       200:
 *         description: "Appointment rejected successfully"
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
 *                   enum: [CANCELLED]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: "Appointment cannot be rejected (not pending or confirmed)"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       403:
 *         description: "User does not have permission to reject appointments"
 *       404:
 *         description: "Appointment not found"
 */
