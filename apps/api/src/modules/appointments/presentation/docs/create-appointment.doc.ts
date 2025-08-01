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
 *
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: "Unique appointment identifier"
 *         userId:
 *           type: string
 *           format: uuid
 *           description: "ID of the user who owns the appointment"
 *         spaceId:
 *           type: string
 *           format: uuid
 *           description: "ID of the space being scheduled"
 *         date:
 *           type: string
 *           format: date-time
 *           description: "Appointment date"
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: "Appointment start time"
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: "Appointment end time"
 *         status:
 *           type: string
 *           enum: [PENDING, CONFIRMED, CANCELLED, REJECTED]
 *           description: "Current status of the appointment"
 *         originalDate:
 *           type: string
 *           format: date-time
 *           description: "Original appointment date (same as creation date initially)"
 *         changeCount:
 *           type: integer
 *           minimum: 0
 *           description: "Number of changes made to the appointment"
 *         maxChanges:
 *           type: integer
 *           minimum: 0
 *           description: "Maximum changes allowed (3 for USER/MANAGER, unlimited for ADMIN)"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Appointment creation timestamp"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Last update timestamp"
 *
 *     CreateAppointmentRequest:
 *       type: object
 *       required:
 *         - userId
 *         - spaceId
 *         - date
 *         - startTime
 *         - endTime
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: "ID of the user creating the appointment"
 *         spaceId:
 *           type: string
 *           format: uuid
 *           description: "ID of the space being scheduled"
 *         date:
 *           type: string
 *           format: date-time
 *           description: "Appointment date"
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: "Appointment start time"
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: "Appointment end time"
 *
 *     UpdateAppointmentRequest:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: "New appointment date"
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: "New appointment start time"
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: "New appointment end time"
 *         status:
 *           type: string
 *           enum: [PENDING, CONFIRMED, CANCELLED, REJECTED]
 *           description: "New appointment status"
 *
 *     AppointmentResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Appointment'
 *
 *     AppointmentListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Appointment'
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             total:
 *               type: integer
 *               example: 50
 *             totalPages:
 *               type: integer
 *               example: 5
 *
 *     AppointmentError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *             code:
 *               type: string
 *               enum: [VALIDATION_ERROR, TIME_CONFLICT, USER_NOT_FOUND, SPACE_NOT_FOUND, APPOINTMENT_NOT_FOUND, UNAUTHORIZED, CHANGE_LIMIT_EXCEEDED]
 *             statusCode:
 *               type: integer
 *               example: 400
 *
 *   responses:
 *     AppointmentCreated:
 *       description: "Appointment created successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentResponse'
 *
 *     AppointmentUpdated:
 *       description: "Appointment updated successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentResponse'
 *
 *     AppointmentDeleted:
 *       description: "Appointment deleted successfully"
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Appointment deleted successfully"
 *
 *     AppointmentList:
 *       description: "List of appointments retrieved successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentListResponse'
 *
 *     AppointmentError:
 *       description: "Appointment operation failed"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentError'
 */
