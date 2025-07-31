/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete appointment
 *     description: |
 *       Deletes an appointment. Requires authentication.
 *       - **USER:** Cannot delete appointments. Should use cancellation (update status to CANCELLED) to keep the record in their history.
 *       - **MANAGER:** Cannot delete appointments.
 *       - **ADMIN:** Can delete any appointment.
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
 *     responses:
 *       204:
 *         description: "Appointment deleted successfully"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       403:
 *         description: "User does not have permission to delete appointments"
 *       404:
 *         description: "Appointment not found"
 */
