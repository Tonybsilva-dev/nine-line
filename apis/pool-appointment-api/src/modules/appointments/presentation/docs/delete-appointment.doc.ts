/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete appointment
 *     description: |
 *       - **USER:** Cannot delete appointments. Should use cancellation (update status to CANCELLED) to keep the record in their history.
 *       - **MANAGER:** Cannot delete appointments.
 *       - **ADMIN:** Can delete any appointment.
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
 *       204:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 */
